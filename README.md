This document describes the examples that were coded during the Edument React Advanced course.

# Requirements
Ensure that [NodeJS](https://nodejs.org/) is installed on your system.

The editor used during the course is [Visual Studio Code](https://code.visualstudio.com/). 

Also install [React Devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi). 

# Usage
In the project directory, run:

    npm install

to install the project's dependencies.

## Available Scripts

    npm start

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

    npm test

Launches the test runner in the interactive watch mode.<br>

    npm run build

Builds the app for production to the `build` folder.<br> It correctly bundles and optimizes React for production mode.

> This project was initially generated with the command `npx create-react-app react-advanced`. 

# Examples
The code for each example is located in a separate folder under `src`.

A code example can be run by uncommenting it in `src/index.js`. This renders the _App_ component for that example. 

## useReducer
The `useReducer` folder contains microexamples that highlight certain aspects of using the _useEffect_ hook, and also introduces the _useReducer_ hook for managing component state. 

See each file in the folder for detailed comments.

> Choose which microexample to run by uncommenting it in `useReducer/index.js`.

## useTask
This example demonstrates how to implement a custom hook and further utilizes the _useReducer_ hook for managing state.

The _useTask_ hook enables the controlled execution of asynchronous "tasks"; a task is a Promise whose status is handled by the hook. A component uses _run_ and _cancel_ methods returned by _useTask_ to schedule and cancel tasks.

This example contains two versions (choose which to run in `src/useTask/index.js`):

*   v1

    Select a user id and then click the _Fetch User_ button to schedule a task which fetches a user by the chosen id. Cancel the fetch by clicking the _Cancel_ button.

    There are two modes of operation (see the _App_ component's _handleSubmit_ event handler): 

    *   Allow multiple fetch tasks to be scheduled (only the latest task's results will be rendered).

    *   Disallow multiple fetch tasks to be scheduled.   

*   v2

    "Instant fetch" functionality, where fetch tasks are implicitly scheduled (and possibly cancelled) as different user ids are selected.

    The input is debounced, so as to prohibit tasks from being unnecessarily scheduled.

    > Note that the function to schedule tasks, _debounceTask_ (in the _App_ component), is memoized with the _useMemo_ hook, in order for debouncing to work properly (if memoization is not utilized, the _debounceTask_ would be recreated upon every render of the _App_ component).

## useFetch
This example illustrates the importance of maintaining referential integrity between renders. 

In this instance arguments are passed to a custom hook which reruns an effect when its dependencies change. The arguments, a function bound to a user id and an object, are created anew upon every render, leading to the effect in _useFetch_ being triggered upon every render, resulting in an infinite loop!

The problem is avoided using the _useCallback_ and _useMemo_ hooks.

## useStateImpl
A custom (re)implementation of React's built-in _useState_ hook, using _useReducer_. Also supports functional updates.

## errorBoundary
This example demonstrates how to implement an error boundary component (_ErrorHandler_) and place multiple instances of it throughout the component tree.

The _ErrorHandler_ component supports:

*   Rendering a custom fallback UI - via a _Fallback_ prop - that is specific to the level in the component tree at which an error is caught.   

*   Rendering an error boundary with a so-called _error context_, which allows components below an error boundary to access methods for capturing, logging and retrying errors raised __outside__ the component render, e.g. in event handlers and the _useEffect_ hook.

Test the error handling functionality in the following manner:

*   In the profile section, click the __Edit Details__ button to generate an error in an event handler. 

    This error is logged via the _trace_ method from the error context rendered by the top-level error boundary.

*   Go offline by turning off your network connection. Then reload the page.

    An error occurs in the _useEffect_ hook in the _Profile_ component, since the user profile info cannot be fetched. This error is captured via the _capture_ method from the error context. 

    Go online by turning on your network connection. In the fallback UI that is shown, click __Retry__ to reload the page; this attempts to fetch and render the user profile info again.

*   In the Feed section, click _Refresh_;  this simulates refetching feed items, generating an error that gets logged via   
    the _trace_ method from the error context.

*   In `Feed.js`, comment out the last feed item's title property, then reload the page. 

    Each feed item is wrapped in its own error boundary, which shows a specialized feed item upon catching an error occurring during the _FeedItem_ render.

*   In the Search section, enter the query "fail" to simulate a search error, which is caught by the error boundary declared 
    in the Search component.

    Notice that as another query is entered, the error boundary automatically resets its error state (see the _componentDidUpdate_ lifecycle method in _ErrorHandler_).

## todo
This example demonstrates optimizing a simple "Todo" application by:

*   Memoizing expensive, blocking calculations with _useMemo_.

    See the _useMemoMode_ hook in `hooks.js`.

*   Moving blocking operations to be performed outside the component render with _useEffect_.

    See the _useAsyncMode_ hook in `hooks.js`.

*   Avoiding unnecessary component rerenders with _React.memo_ and memoizing functions with _useCallback_.

    See these concepts applied in `App.js` and `Todo.js` in order to optimize rendering of a todo list.

*   Interaction tracing.

    See the _createTodo_ callback function in `App.js`.

## context
This example demonstrates how to avoid unnecessary rerenders that may occur in conjunction with using React Context.

In this scenario, a context contains (global) state pertaining to authentication and theming. Two components, _Login_ and _ThemeSelector_, are to be rendered as follows:

*   When a different theme is selected, the entire component tree should be rerendered, so as to display all UI elements 
    (buttons) with the selected theme.

*   When the authentication state changes, __only__ the _Login_ component should be rerendered, as the _ThemeSelector_ does
    not utilize this slice of the state.

Uncomment a version of the _App_ component in `index.js`, each of which is described below. Open the console log to observe the behaviour of each version.

*   `App1.js`

    A single _AppContext_ is consumed by both _Login_ and _ThemeSelector_, and a state change triggers a rerender of both components. Thus, _ThemeSelector_ is also (unnecessarily) rerendered when the authentication state changes.

*   `App2.js`

    The previous, single _AppContext_ has been split into two separate context for each state slice, _AuthContext_ and _ThemeContext_, and the __Login_ and _ThemeSelector_ components each consume the context(s) they explicitly require. 

    _Login_ rerenders upon changes in both contexts, whereas _ThemeSelector_ only rerenders upon the theme changing.

*   `App3.js`

    If the contexts cannot be split, memoize and create a wrapper for the component for which rerenders are to be avoided.
    
    In this case, _ThemeSelector_ is rendered by a wrapper component called _ThemeSelectorWrapper_, which consumes the _AppContext_ and renders the underlying, memoized _ThemeSelector_._ Thus, even though _ThemeSelectorWrapper_ is rerendered when the authentication state changes, _ThemeSelector_ - the "heavy" component - rerenders only when theme actually changes, due to memoization.

## react-window
When rendering large lists of components, implementing "windowing" (or a "virtualized list"), optionally coupled with infinite scrolling, may often be preferable in terms of performance. 

[This demo](https://react-window-example.sethcorker.com/) demonstrates the performance boost one may get with this technique.

See [this article](https://blog.logrocket.com/windowing-wars-react-virtualized-vs-react-window/) for getting started with more efficient list rendering.

## memo
The `memo` example has the following setup:

*   Clicking the button "My Chart N" (where N starts as 1) __prepares__ a new chart, for which data can be generated.

*   Clicking the button "Generate data" generates data and renders a "complex" chart, a typically slow process.

There are three versions of this example:

*   Unoptimized

    Preparing a new chart takes a really long time, and it also generates data, which is an error (data should only be generated by clicking the "Generate data" button).

*   Optimized 1

    Clicking the "My Chart N" button __instantly__ increases N by 1, and new data is generated when clicking the "Generate data" button. 

    Generated data is memoized with _useMemo_ and is only recomputed when the data parameter is changed (upon clicking the "Generate data" button). The _Chart_ component is memoized with _React.memo_ to skip rerendering when the _chartData_ hasn't changed.

*   Optimized 2

    Using the principle of __state colocation__, the preparation of a new chart has been isolated to a component _ChartName_, which removes the need for memoization.

## testing
This example demonstrates using the __React testing library__ for unit testing components. It's comprised of:

*   `testing/counter`

    A basic test of a simple component, simulating click events (user interaction) and asynchronous code.

*   `todo`

    Tests the _TodoForm_ component and form-related logic. 
    
    Also tests the _App_ component and asynchronous logic (data fetching); note that a mock server [msw](https://mswjs.io/) is setup to catch network requests and respond with mock results.

## reduxCounter
This example demonstrates the Redux library for managing global state in a simple React application.

> Install the [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) to inspect a Redux store and its state at runtime.

## authRedux
Using Redux to manage user authentication state.

The general structure of this example is as follows:

*   "Users" data is fetched from a REST API.

*   The _React Router_ library is used to implement routes and navigation. 

    The available routes are:

    *   `/`

        Displays a welcome message.

    *   `/users`

        Displays links to all users.

    *   `/users:id`

        Displays data about a single user (with the user id indicated by the _route parameter_ `id`).

        > Note that this route is "contained" as a __subroute__ within the `/users` route, which serves as an "index page" for all users. This means that the `/users` route is always rendered _first_, and if React 
        Router then determines that the current browser path also matches this route, it will render the 
        data about a specific user. 

    *   A non-existent route, such as `/foo`, will be caught by a _default_ route.

*   Each of the routes above corresponds to a component being rendered, which may be considered a "page". 
    These page components are located in the `pages` folder.

*   The `/users` route requires the user to be logged in. 

*   The components that access the Redux store to retrieve global authentication state and functionality are:

    *   The page component _Login_, enabling a user to log in.

    *   The _RouteGuard_ component, guarding (preventing navigation to) the `/users` route.

    *   The _Navigation_ component, allowing the logged in user to log out.

### Data fetching using thunks
As an alternative to fetching users in the _Users_ page component with an _useEffect_, the data fetching logic has been moved to an __async action creator__ (see _usersFetch_ in `actions.js`). 

A specific Redux middleware named __redux-thunk__ makes it possible to structure such asynchronous logic in an action that is a function ("thunk"). 

## reduxObservable
An example of how to add the `redux-observable` middleware to a Redux-powered application and implement side effects via `RxJS`.

The sample application allows the user to search Spotify for tracks based on track name. It supports debouncing, filtering and avoiding duplicate queries via RxJS operators. See `epics.js` for an in-depth description (which also details how to acquire a Spotify token needed to run the example).

# References

*   [A complete guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)

    __Required__ reading to get a deeper understanding of the essential `useEffect` hook.

*   [When to use useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)

*   [Optimizing the component render](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render)

*   [React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)    

*   [Interaction tracing](https://gist.github.com/bvaughn/8de925562903afd2e7a12554adcdda16)

*   [Testing React components](https://testing-library.com/docs/react-testing-library/intro)

    Create unit tests for React components with the Testing Library (included in _create-react-app_ projects by default). 

*   [Establishing a testing strategy](https://medium.com/swlh/developing-a-client-side-testing-strategy-fdc2886f4acb)

*   [Application state management](https://kentcdodds.com/blog/application-state-management-with-react)

    Thoughts on implementing global application state, using React and Context (as an alternative to Redux).

*   [Learn RxJS](https://www.learnrxjs.io)

    Simple example of using RxJS.

    Also see [this codesandbox](https://codesandbox.io/s/1ql0qq422j).

*   [redux-observable and RxJS](https://redux-observable.js.org/)

*   [Data fetching with React Query](https://youtu.be/seU46c6Jz7E)

    Working with global application state, specifically related to how fetched data should be stored and managed, and how to implement data fetching with a dedicated library (React Query).

# Contact
Marc Klefter | marc.klefter@edument.se