# React with dynamic data workshop for Founders & Coders

The purpose of this workshop is to learn one of the most common use cases for modern frontend frameworks (React in this case).
That use case is fetching some data from an API and then rendering it.

For this workshop, we'll use the GitHub API since it's well documented and familiar to most students.

## Set up

Start by opening the workshop folder, don't peek into solution just yet!

```bash
# git clone this repo, ssh or HTTPS, whatever you usually do!

cd react-dynamic-data-workshop

cd workshop

npm i

# or

yarn

#and finally

npm start

# or

yarn start
```

You should now see the following message:

```
Compiled successfully!

You can now view dynamic-data in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.0.26:3000
```

If you do not see this message make sure you have a version of node which is above 8 and npm or yarn installed. Make sure you remember to install dependencies.

If you're a Linux user you might get an error about exceeding the maximum number of file watchers.

Running this command to increase the max watchers should fix it:

`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

## What we'll be building?

### A GitHub user card!

![](https://user-images.githubusercontent.com/17658189/35216025-193031d4-ff5e-11e7-9289-8f7ca5c51a1a.png)

## Walkthrough

Before you start I'd like you to take a deep breath, you'll get errors through this workshop, and they are annoying and cryptic at the start, but you'll learn how to read them. The most important trick is to always scroll to the top of your error output since that's where the most relevant errors are usually. If you get stuck, try to get someone else to look at your code. Sometimes the bundler is going to be a bit funny with restarting the file watchers on the dev server so if you don't see changes and feel like you should, restart your server.

Mostly: don't fall into despair, it's just code and you got this!

### Note about structure

Before we get started, I'd like to focus on how we're going to be arranging which components fetch data and which just render it so that we'll have an easier time later in the course walkthrough.

Let's start by breaking our user card into some top-level components. Based on our design, it looks like our two important components are going to be:

1.  `<UserHeader/>` with your Github avatar, name, username and follower count
2.  `<RepoList/>` With lists of your repositories with their name, descriptions, links and star count.

Above these components, we'll have `App.js` which is where we'll keep the code for our initial data fetch. Here is a small breakdown on how we could structure our components for this exercise and what will be the responsibility of each component.
There isn't a single right way to architect your component structure and something even this simple can be done multiple ways. This is just one way to think about this and will make it easier not to get stuck during this workshop.

![](https://i.imgur.com/oRW3Yf9.png)


Let's get started with creating our `UserHeader` and then fetching some data in the `App`!

### Creating UserHeader & setting up App

Start by creating a new file for our `UserHeader` component.

Going back to the design, create the layout for the `UserHeader`, think about what props you'll need. Import `UserHeader` to `App` and pass some hardcoded props to it initially to make sure everything is working.

```jsx
// in App

// ...
import UserHeader from './your/path/to/UserHeader' // make sure you check if this is a named export or default export 

 const App = () => {
  // ...
  
  return (
    <main>
      <UserHeader 
        imgSrc="placeholder.png"
        userName="kitten"
        userUrl="test.com"
        followersCount={44}
      />
    </main>
  )
 }

```
We'll also need to hold the data we're getting back from the API somewhere so let's also create a state value called `userData` with the initial value of `null`.

```jsx
 const App = () => {
  const [userData, setUserData] = React.useState(null);
  
  return (
    <main>
      <UserHeader 
        imgSrc="placeholder.png"
        userName="kitten"
        userUrl="test.com"
        followersCount={44}
      />
    </main>
  )
 }
```

Now let's get some real data showing! I like to separate functions that are not directly related to rendering outside the component, into another folder which is commonly called `utils`, create this new folder inside the `src` folder of your project and create a file called `getUserData.js`.

### Get the data

Now we'll need a function that gets your GitHub user data. Create a function that makes a request to `https://api.github.com/users/{{your username}}`

You can use any of your preferred method to create an API request, but I'll give an example with the `fetch` API. Try not to copy-paste; you'll learn more if you don't!

```javascript
const checkResponse = (response) => {
  if (!response.ok) throw new Error(`Network error: ${response.status}`);
  return response.json();
};

export const getUserData = (username) => {
  return fetch(`https://api.github.com/users/${username}`).then(checkResponse);
};
```

**Note**: this function returns a `Promise`

Now that we have our `getUserData` function, let's import it to our component which will be rendering the data.

### Lifecycle and rendering

We've heard about React effects already (if not, [here](https://reactjs.org/docs/hooks-effect.html) is a refresher that will be relevant for the next part). They are a place to execute side-effects, such as fetching data. In our case, we'll want to run a data fetching function once the component mounts into the DOM. Sounds familiar? Let's create an effect inside the `App` component with `React.useEffect()` where we'll call `getUserData`.

```jsx
 const App = () => {
  const [userData, setUserData] = React.useState(null);
  
  React.useEffect(() => {
    const username = "sofiapoh";
    getUserData(username).then(data => console.log(data));
  }, []);
  
  return (
    <main>
      <UserHeader 
        imgSrc="placeholder.png"
        userName="kitten"
        userUrl="test.com"
        followersCount={44}
      />
    </main>
  )
 }
```

Don't forget the second argument to `useEffect`—the empty array. This will tell React to only run the effect once. Without this your component will re-render every time you update your state, which will re-run the effect, which will update the state, which will re-render your component, which will re-run the effect... (you don't want to make thousands of requests in a row and get rate limited by Github).

Hopefully you're seeing something in your console by now! That alone is not enough for us to get rendering, we need to set this data in our components `userData` state variable we defined earlier for us to consume it outside the effect.

```javascript
getUserData(username).then(data => setUserData(data));
```

Let's take this data and use it to finally render some dynamic content.

Before your components return statement destructure following keys out of `userData` :

```javascript
const { avatar_url, html_url, name, followers, repos_url } = userData;
```

And pass them on your components like so:

```javascript
return (
  <main>
    <UserHeader 
      imgSrc={avatar_url}
      userName={name}
      userUrl={html_url}
      followersCount={followers}
    />
  </main>
);
```

**🚨 You should now be seeing an error 🚨**

```
Uncaught TypeError: Cannot read property 'avatar_url' of null
```

### When the data isn't there yet

The first time this component renders the `data` state variable is set to `null`. Our `useEffect` won't run until _after_ the first render, so we need to handle this `null` case.

We need to provide a loading view, so we're not trying to render content that is not there yet. In our case we'll just add a small safeguard before we destructure:

```javascript
if (!userData) {
  return <h3>...Loading</h3>;
}

const { avatar_url, html_url, name, followers, repos_url } = userData;

return (
  <main>
    <UserHeader 
      imgSrc={avatar_url}
      userName={name}
      userUrl={html_url}
      followersCount={followers}
    />
  </main>
);
```

This will also help you to avoid UI errors and provide helpful error messages to your user. Note that unless the payload of the made request is particularly heavy, you might want to skip loading state and just return `null` to defer rendering until the content is ready. This way you won't get a janky looking flash of loading state before the component finishes loading.

If you feel fairly comfortable continuing ahead, I'd like you to take some time to style your `<UserHeader/>` component to roughly match the design. You can use regular CSS, just create a file (a common convention is to name the CSS file to match the js filename) and import it at the top of your file:

```javascript
import "./UserHeader.css";
```

This import is handled by your bundler (Parcel in this case) and doesn't transform CSS into Javascript.

Note: in jsx, some html attributes are camelCase and some are slightly different, for example: `class` => `className`.

### What's next?

Hopefully you'll now have a nice looking header component for our Github user card! Next we'll tackle creating a list of your repositories.

You might have noticed from the response we got from `getUserData` didn't include your repositories. We did, however, get a `repos_url` from the response. Let's move on to the next part of the workshop to see how we can tackle this.

### Creating your RepoList component

Your next steps are:

1. Create a new file for your `<RepoList/>` component.
2. Add some basic structure and mock data to the component
3. Import it into the `App` file.
4. Refactor your `getUserData` function to take a full URL as an argument so you can use it on both of the components.
5. Pass `repos_url` to `<RepoList />` as a prop from `App`
6. Fetch data in the `<RepoList/>` component using the`url` prop with `useEffect` similarly to before.

**There is a small gotcha!** If you try to render `<RepoList/>` before the parent component has `repos_url` you're going to run into errors as `RepoList` tries to use it immediately when it mounts. One way to handle this is to use a ternary statement to render the component only when we have the data we need:

```javascript
if (!userData) {
  return <h3>...Loading</h3>;
}

const { avatar_url, html_url, name, followers, repos_url } = userData;

return (
  <main>
    <UserHeader 
      imgSrc={avatar_url}
      userName={name}
      userUrl={html_url}
      followersCount={followers}
    />
    {repos_url ? <RepoList url={repos_url} /> : null} // Could render a loading component here instead
  </main>
);
```

When your `<RepoList/>` is showing correctly, we can start to render some real data. You've probably noticed the data we have is an `Array`. A very common pattern is to create a functional component for the data that you want to render and then map over your data dynamically creating a list of the components. That's what we'll do next:

```javascript
// new file: Repo.js for rendering a single repository

const Repo = ({ name, stargazers_count, description, html_url }) => {
  return (
    <li>
      <a href={html_url}><h4>{name}</h4></a>
      <p>{description}</p>
      {/* Add your own styles, stargazers_count etc. here */}
    </li>
  );
};

export default Repo;
```

Don't forget to import your `Repo` component into the `RepoList!`

```javascript
// In RepoList
import Repo from './Repo'

const RepoList = ({ url }) => {
  const [repos, setRepos] = React.useState([]);

  React.useEffect(() => {
    getUserData(url).then(data => setRepos(data));
  }, [url])

  return (
    <ul>
      {repos.map((repo) => (
        // Spreading props of a single repo's data to a single Repo component
        <Repo key={repo.id} {...repo} />
      ))}
    </ul>
  );
};


```

All dynamically rendered components like our `Repo` here need a `key` prop so React can keep track of the correct elements being added/removed from the DOM.

When you have a list of repos rendering with the data which matches the designs, add some styles! CSS is underrated!

Great job! :sparkles:

### Stretch goals

- More CSS
- Create a form input to dynamically create a Github user card from any username

### Feedback? Improvements? Clarification?

Create a pull request or an issue!
