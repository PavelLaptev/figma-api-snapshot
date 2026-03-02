# Introduction | Developer Docs

Source: https://developers.figma.com/docs/widgets/

*   [](/)
*   Widgets
*   Getting Started
*   Introduction

# Introduction

Welcome to the Widget API!

Widgets are interactive objects that extend the functionality of design files and FigJam boards. Unlike plugins that run for a specific person, everyone can see and interact with the same widget. You can add as many widgets to the board as you need and even run them at the same time. This makes them great for collaboration!

If a widget does not contain the manifest field `"documentAccess": "dynamic-page"`, the entire document will be loaded when a widget runs or is interacted with. In large or complex files, loading the entire document the first time your widget runs can sometimes cause a delay of 20 to 30 seconds. If your widget needs to access other pages in the document, update your widget to contain the `documentAccess` manifest field and only [load the pages the user needs](/docs/plugins/accessing-document/), rather than the whole document.

Here’s a few examples of the types of widgets you can create:

*   Import data to create tables or interactive visualizations
*   Gather insight through live polls and voting counters
*   Build timelines and manage projects with calendars
*   Connect and play games in multiplayer

Not sure what you want to create? Check out these guides:

*   **[Widgets vs plugins →](/docs/widgets/widgets-vs-plugins/)**
*   **[Figma design or FigJam widgets →](/docs/widgets/figma-figjam-widgets/)**
*   **[Explore widgets in the Community →](https://www.figma.com/community/widgets)**

## Build widgets​

We've designed the Widget API around two JavaScript-based technologies: TypeScript and JSX. You'll need to have a basic understanding of JavaScript to build widgets. If you have written React before you’ll feel right at home! **[Required knowledge →](/docs/widgets/prerequisites/)**

A widget is a function that renders components inside a dedicated widget object. You build your widget interface from a combination of components or sublayers. Then pass in properties to customize the look and feel of the widget.

When we talk about components, we’re using language from [React components](https://reactjs.org/docs/components-and-props.html). These are different to the components and instances you'd use in Figma. Most of the components in the Widget API are layers you’d interact with in files—such as frames, text, and shapes. **[Explore Widget API reference →](/docs/widgets/api/api-reference/)**

![Widget components](https://static.figma.com/uploads/a1de4b17f2223c038bce3d888fc4dbc9a65fe66c)

Widgets are objects in files that everyone can see and use. You can choose how people can interact with your widget. You can specify a property menu, create a custom interface, or run widgets in response to click events. **[Customize widget interactions →](/docs/widgets/handling-user-events/)**

![Widget interaction](https://static.figma.com/uploads/415e9599a57feae0a9936db7eb96c17099bbb21d)

Widgets can also access the functionality of the Plugin API. This allows you to pull data from external resources, open an iFrame to show more UI, or edit other objects in a file. If you’re building a standalone widget, you may not use the Plugin API at all. [**Using the Plugin API →**](/docs/widgets/using-the-plugin-api/)

## Resources​

Our [QuickStart](/docs/widgets/setup-guide/) guide show you how to set up your environment and run a sample widget. You can [explore our sample widgets](https://github.com/figma/widget-samples) in GitHub for more inspiration.

The [API reference](/docs/widgets/api/api-reference/) covers the components, hooks, and functions you’ll use build widgets. Our development guides explore concepts and outline the process for building successful widgets.

Get help with your plugin and widget related questions in the [Figma Community forum](https://forum.figma.com/c/plugin-widget-api/20). To connect with other widget and plugin developers [join our community-driven Discord server](https://discord.gg/xzQhe2Vcvx).

[

Next

Prerequisites

](/docs/widgets/prerequisites/)

*   Build widgets
*   Resources

---

# Prerequisites | Developer Docs

Source: https://developers.figma.com/docs/widgets/prerequisites/

*   [](/)
*   Widgets
*   Getting Started
*   Prerequisites

# Prerequisites

Our Widget API is designed to be written in [JSX](https://reactjs.org/docs/introducing-jsx.html) and [TypeScript](https://www.typescriptlang.org/) and leverage our existing [plugin API](/docs/plugins/) extensively. Both JSX and TypeScript need to be compiled down into JavaScript prior to being run in the Widget Sandbox (in the browser).

## JSX​

If you are used to writing HTML, you might find writing JSX familiar. JSX allows us to express the desired widget object using a declarative syntax that looks like the following snippet

code.tsx

```
const { widget } = figmaconst { AutoLayout, Text } = widgetfunction JSXSample() {  return (    <AutoLayout>      <Text>Hello Widget</Text>    </AutoLayout>  )}widget.register(JSXSample)
```

Under-the-hood, the `<Text>Hello Widget</Text>` line above gets converted into the following JavaScript code:

code.js

```
figma.widget.h(Text, null, "Hello Widget")
```

`figma.widget.h` comes from how we've configured `tsconfig.json` (if this was React, it would be `React.createElement`).

Additionally, with JSX we can specify attributes on each element (known as `props`). When passed props, the conversion looks something like this:

Passing in props

```
// code.tsx<Text fontSize={20}>Hello Widget</Text>// code.jsfigma.widget.h(Text, { fontSize: 20 }, "Hello Widget")
```

## TypeScript​

TypeScript is an extension of the JavaScript that allows you to add type annotations to your code. These don't change how your code runs, they are just notes for yourself and for the compiler.

When pair with an editor like Visual Studio code, these annotations are able to provide helpful hints during development:

![](https://static.figma.com/uploads/31b8d7cdf04d6ff8d81d05da847920d4139fcaf2)

## Further Reading​

Here are some more resources you may find helpful to get started:

*   [Pre-requisites for working with our our plugin API](/docs/plugins/prerequisites/)
*   [TypeScript with the plugin API](/docs/plugins/typescript/)
*   [TypeScript: Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
*   [Primer on JSX](https://reactjs.org/docs/introducing-jsx.html)
*   [The Odin Project](https://www.theodinproject.com/courses/web-development-101)
*   [Codecademy: Web Development](https://www.codecademy.com/learn/paths/web-development)
*   [Khan Academy: Intro to JS](https://www.khanacademy.org/computing/computer-programming/programming)

For more complex widgets, additional tools used in modern web development will be useful. You don't need to learn these tools before starting to write widgets, but they will come in handy eventually. We opted to build on top of the most popular open-source tools in the web development community rather than to roll out our own proprietary solutions. Here are some examples of things you might end up using:

*   An integrated development environment (IDE) such as [VS Code](https://code.visualstudio.com/), [Eclipse IDE](https://eclipseide.org/), or [IntelliJ IDEA](https://www.jetbrains.com/idea/): As a developer, IDEs can be a useful way to work across multiple files or sources and often provide extensions that make life easier. JavaScript and HTML are well-supported languages in most IDEs.
*   [Asynchronous JavaScript](/docs/plugins/async-tasks/): Async operations are an important part of Figma widgets, such as for loading pages or requesting and using data that may take a brief time to return.
*   Webpack, to [bundle](/docs/plugins/libraries-and-bundling/) large multi-file projects and import libraries: Bundling helps pack dependencies into the format required for Figma widgets.
*   React, Vue, etc. to create complex user interfaces.

[

Previous

Introduction

](/docs/widgets/)[

Next

Setup Guide

](/docs/widgets/setup-guide/)

*   JSX
*   TypeScript
*   Further Reading

---

# Setup Guide | Developer Docs

Source: https://developers.figma.com/docs/widgets/setup-guide/

*   [](/)
*   Widgets
*   Getting Started
*   Setup Guide

# Setup Guide

This short guide will walk you through the steps needed to setup your development environment for writing and creating a simple widget for FigJam. By the end of this guide, you will have a simple counter widget that records and displays the number of times people have clicked on it.

The setup for widget development is very similar to the set up for plugin development. **If you’re already familiar with Figma plugin development, feel free to skip to Create a new widget, Sample widgets, or Building widgets from scratch.**

## Installation​

*   **Visual Studio Code**: Visual Studio Code can be downloaded here: [](https://code.visualstudio.com/)[https://code.visualstudio.com/](https://code.visualstudio.com/).
    
*   **Node.js and NPM**: You can download Node.js here, which will include NPM: [](https://nodejs.org/en/download/)[https://nodejs.org/en/download/](https://nodejs.org/en/download/).
    
*   **Get the Figma desktop app**: At this time, widget development and testing needs to be done using the Figma desktop app. This is because Figma needs to read your code saved as a local file. The Figma desktop app can be downloaded here: [](https://www.figma.com/downloads/)[https://www.figma.com/downloads/](https://www.figma.com/downloads/).
    
    If you already have the desktop app, please make sure to update to the latest version, as several features have been added specifically in order to provide a better widget development experience.
    

## Create a new widget​

1.  Log in to your account and open the Figma desktop app
2.  You can open any existing Figma / FigJam document or create a new one.
3.  Go to Menu > Widgets > Development > New widget...

This will bring up the "Create widget" modal to create a starter widget. Give it a name, then choose "Simple widget" in the next screen. Save the widget anywhere on disk.

## Modify your widget​

1.  **Open the folder you just created using Visual Studio Code.** Widgets are defined using multiple files and you'll want to be able to edit them all of them, so one trick is to open the folder itself rather than any of the files inside it.
    
2.  **Install the dependencies**: run `npm install`.
    
    We are installing typescript and both widget and plugin typings since a lot of the code you'll write inside of widgets will use the Figma plugin API as well as the widget API.
    
3.  **Install the linter**
    
    Linting, the automated validation of source code for issues, can be very helpful for catching errors early in the development of your widget. Figma provides a set of [typescript-eslint rules](https://github.com/figma/eslint-plugin-figma-plugins?tab=readme-ov-file#eslint-plugin-figma-plugins) to help support widget development. These rules can identify, and in many cases automatically fix, issues in your widget code.
    
    To install and use the linter, follow the instructions in the [**Usage** section](https://github.com/figma/eslint-plugin-figma-plugins?tab=readme-ov-file#usage) of the README included with the linter rules. [Find the `eslint-plugin-figma-plugins` repository on GitHub →](https://github.com/figma/eslint-plugin-figma-plugins?tab=readme-ov-file)
    
4.  **Set up TypeScript compilation**
    
    Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item, then select "npm: watch". This tells Visual Studio Code to compile your `widget-src/code.tsx` code into a `dist/code.js` file. It will watch for changes to `*.tsx` files and automatically re-generate `dist/code.js` each time. You will have to do this again every time you reopen Visual Studio Code.
    
5.  **Insert your widget into the file**
    
    Inside your FigJam file, you should be able to Go to `Menu > Widgets > Development > {your_widget_name}` to insert your newly created widget. The sample widget should look like a simple counter.
    
6.  **Make some test changes**
    
    Make some simple changes to `widget-src/code.tsx` to get familiar with Visual Studio Code (**not** code.**js** — that's generated and gets overwritten!).
    

That’s it! You are now ready to create your very own widget!

## Sample widgets​

If you understand the fundamentals of building widgets, or you learn best by example, you can explore these [widget samples on GitHub](https://github.com/figma/widget-samples).

## `@figma/create-widget`​

If you're already familiar with widgets, we also provide a single command to help you to get started:

```
npm init @figma/widget
```

## Building widgets from scratch​

If you’re building your widgets from scratch, here’s a sample tsconfig.json to get you started:

```
{   "compilerOptions": {      "jsx": "react",      "jsxFactory": "figma.widget.h",      "jsxFragmentFactory": "figma.widget.Fragment",      "target": "es6",      "strict": true,      "typeRoots": [         "./node_modules/@types",         "./node_modules/@figma"      ]   }}
```

You’ll also want to install widget and plugins typings from npm

```
npm install --save-dev @figma/widget-typings @figma/plugin-typings
```

[

Previous

Prerequisites

](/docs/widgets/prerequisites/)[

Next

Widgets vs Plugins

](/docs/widgets/widgets-vs-plugins/)

*   Installation
*   Create a new widget
*   Modify your widget
*   Sample widgets
*   @figma/create-widget
*   Building widgets from scratch

---

# Widgets vs Plugins | Developer Docs

Source: https://developers.figma.com/docs/widgets/widgets-vs-plugins/

*   [](/)
*   Widgets
*   Getting Started
*   Widgets vs Plugins

# Widgets vs Plugins

If you’re a developer who has built [plugins](/docs/plugins/) before, there are a few key differences to understand between plugins and widgets.

**Plugins**

**Widgets**

Needs to be installed by each user in a file.

Anyone in a file can insert it onto the canvas, then it’s available for use by all users.

Users primarily interact with them outside of the canvas, via off-canvas iframes.

Users primarily interact with them directly on the canvas, like any other native object.  
  
Widgets can create off-canvas iframes, but the entry points for these are on the widget itself.

Run specifically for the user who is running it.

Widgets are collaborative and multiplayer——everyone in a file sees the same instance of a widget.

Only one per user can be open at a time.

An unlimited number of widgets can be in a file and ready to be interacted with, like any other object on the canvas.

**Widgets are better for:** collaborative use cases (e.g. voting) or single-player use cases that require on-canvas interactions (e.g. diagramming).

**Plugins are better for:** single-player automation use cases, use cases related to setting up the activities in a file, or single-player import/export (e.g. using content libraries).

[

Previous

Setup Guide

](/docs/widgets/setup-guide/)[

Next

Figma and FigJam Widgets

](/docs/widgets/figma-figjam-widgets/)

---

# Figma and FigJam Widgets | Developer Docs

Source: https://developers.figma.com/docs/widgets/figma-figjam-widgets/

*   [](/)
*   Widgets
*   Getting Started
*   Figma and FigJam Widgets

# Figma and FigJam Widgets

Widgets are custom interactive objects that run in Figma design and FigJam files.

You can create standalone widgets that don’t need to anything else to run, such as our [sample counter widget](https://github.com/figma/widget-samples/tree/main/WidgetCounter). In this situation, you can use the Widget API without the Plugin API.

You can also create widgets that pull data from external resources or applications, or interact with and edit other layers in the file. For those types of widgets, you’ll need to use both the Widget API ↓ and the Plugin API ↓.

In this guide we’ll walk you through a few things to consider when it comes to Figma design and FigJam files.

tip

📝 **Note:** Both the Plugin and Widget APIs treat Figma design and FigJam files as different editor types. For your widget to work, you need to tell Figma which editor types your widget can run in. [Setting editor type →](/docs/widgets/setting-editor-type/)

## Widget API​

The Widget API allows you to build a widget node that responds to user interaction. Build the widget using components, then manage its state through functions and hooks. [How widgets run →](/docs/widgets/how-widgets-run/)

You can access a majority of the Widget API in both editor types. This includes components and their supported properties. There are still a few things to consider when building your widget.

### Stickable interactions \[FigJam only\]​

One aspect that's unique to FigJam files, and isn’t supported in design files, is [stickable hooks](/docs/widgets/handling-user-events/#stickable-hooks). Stickable widgets can attach to other nodes, like stamps. Stickable host widgets allow you to attach other stickables to it.

If you set the `editorType` to `"figma"` only, or run the widget in a Figma design file, you can’t access either of these hooks:

*   [`useStickable`](/docs/widgets/api/properties/widget-usestickable/)
*   [`useStickableHost`](/docs/widgets/api/properties/widget-usestickablehost/)

### Dark mode \[Figma design only\]​

Figma designs supports both light and dark [themes](https://help.figma.com/hc/en-us/articles/5576781786647). FigJam only supports a light theme.

If you plan to use [`figma.showUI`](/docs/plugins/api/properties/figma-showui/) to show additional UI, you can enable the `themeColors` option. This allows you to use [CSS variables](/docs/plugins/css-variables/) that contain theme-specific colors. Your iframe UI will then adapt to the user’s current theme.

For the widget itself, you still need to assign explicit `fill`, `stroke`, and `opacity` values to components.

## Plugin API​

The Plugin API allows you to view, create, and edit the contents of Figma design and FigJam files.

If you want your widget to open an iframe, or interact with other layers in the file, you’ll need to use the Plugin API.

The editor type impacts which objects, nodes, and functions are available in the Plugin API. [Explore what’s supported in the Plugin API →](/docs/plugins/)

[

Previous

Widgets vs Plugins

](/docs/widgets/widgets-vs-plugins/)[

Next

How Widgets Run

](/docs/widgets/how-widgets-run/)

*   Widget API
    *   Stickable interactions \[FigJam only\]
    *   Dark mode \[Figma design only\]
*   Plugin API

---

# How Widgets Run | Developer Docs

Source: https://developers.figma.com/docs/widgets/how-widgets-run/

*   [](/)
*   Widgets
*   Basics of Widgets
*   How Widgets Run

# How Widgets Run

Widgets run inside the same [sandbox as Plugins](/docs/plugins/how-plugins-run/) but with the additional ability to:

*   Create a custom object that lives on the canvas
*   Respond to user interactions on these custom objects

Widgets only run in response to user interaction and only on the specific client that initiated this interaction. All other clients will see the updated widget via regular updates to the file, via Multiplayer.

![](https://static.figma.com/uploads/ec53bbec145997770f080e95067309f6e72247e4)

As pictured above, it is helpful to think about Widget Code in 2 distinct parts:

1.  **Rendering Code** that describes how a widget should look
2.  **State Updating Code** that updates widget state

## Rendering Code​

Code that describes how a widget should look runs synchronously and should solely depend on a widget’s state in order to avoid inconsistencies when rendering across multiple clients. For instance, a widget shouldn’t depend on attributes of other nodes on the canvas when deciding how it looks.

If you want to use something like [`figma.activeUsers`](/docs/plugins/api/figma/#activeusers) in your widget, the recommended pattern is to use a [lazy default initializer](/docs/widgets/api/properties/widget-usesyncedstate/#lazy-initial-state) to initialize a synced state value.

**This will be enforced at the API level - widget rendering code won’t be able to read and access data outside of the particular widget’s state.**

## State Updating Code​

Code that updates [widget state](/docs/widgets/widget-state/) runs asynchronously; when completed, the widget will re-render. Widgets can do more than just read the widget state: they can access the document via the Plugin API, make network requests via iframes, and open iframes to get more user input.

## File Loading​

Pages in Figma files are loaded as needed, and most widgets will _not_ require access to a user’s complete Figma document. If your widget acts on multiple or all pages in a user's file, you can still improve the experience of users in a very large file by having your widget [load more pages only as needed](/docs/plugins/accessing-document/). To help, TypeScript type definitions are available in our [official typings](https://github.com/figma/widget-typings).

## Network access​

Additional network security is enforced if your widget [limits network access](/docs/widgets/widget-manifest/#networkaccess). When network access is limited, if your widget attempts to access a domain that isn't specified in your widget's manifest, Figma blocks that attempt and returns a content-security policy (CSP) error.

The enforcement of domain access is limited only to requests made by the widget, such as Fetch API requests to a public REST API. If your widget renders a website in an iframe, network access limits only apply directly to the website's domain. Network access limits do not affect resources needed by that website. For example, suppose your widget frames and limits access only to `figma.com`. Your widget would be prevented from rendering content from other domains. However, `figma.com` would still be able to load external resources, such as scripts for Google Analytics.

[

Previous

Figma and FigJam Widgets

](/docs/widgets/figma-figjam-widgets/)[

Next

Widget State

](/docs/widgets/widget-state/)

*   Rendering Code
*   State Updating Code
*   File Loading
*   Network access

---

# Widget State & Multiplayer | Developer Docs

Source: https://developers.figma.com/docs/widgets/widget-state-and-multiplayer/

*   [](/)
*   Widgets
*   Development Guides
*   Widget State & Multiplayer

# Widget State & Multiplayer

Widgets live on the canvas and can be highly interactive. In certain cases, multiple users might even click on the same widget at the same time! It is crucial to design your widget's state with multiplayer scenarios in mind.

## When to use `useSyncedState` vs. `useSyncedMap`​

In the counter example [here](/docs/widgets/widget-state/), if 2 users click on the counter at the same time, both users will set `count` to `count + 1`. This is undesirable because it means that only one vote gets registered! The desired behavior here is for `count` to become `count + 2` instead.

We can achieve this by using `useSyncedMap` to store a map of `sessionId` to votes - under the hood, the synced map will merge keys that have been created / removed / updated across different clients. Beyond the top level keys of the synced map, the semantics of each value stored in it is exactly the same as a single synced state value.

![](https://static.figma.com/uploads/d1e87cf73363874a8bd35ecdd9aa7725d463ea0b)

Here’s a quick summary of when to use `useSyncedState` vs `useSyncedMap`:

`useSyncedState`

`useSyncedMap`

Great for storing simple values that should always override the last value

Great if you want to merge “edits” from multiple clients that might override each other otherwise  
  
Use cases: Polls, Counters, Tables

In a Poll widget, `useSyncedState` can be used to implement the show / hide results toggle

In the same Poll widget, tracking votes in the poll should use `useSyncedMap` instead to ensure that clients don’t override each other’s votes.

## When to use one vs. many `useSyncedState`​

The flexibility of `useSyncedState` means that you might end up storing complex JSON structures in a single `useSyncedState` call OR you might decide to break this up into multiple `useSyncedState` calls.

One vs many useSyncedState

```
// oneuseSyncedState("settings", {  "color": "blue",  "size": "large",})// manyuseSyncedState("color", "blue")useSyncedState("size", "large")
```

Choosing between these two options ultimately depends on how you want the values to be merged over multiplayer.

If you have one big synced state, each value that gets set on this synced state clobbers the last value.

Setting one big synced state

```
setState({  color: "red", // <- client A sets this  size: "large"})setState({  color: "blue",  size: "medium" // <- client b sets this})// only one of those changes will end up taking effect.// the second setState call will effectively override the first one.
```

If instead you had 2 useSyncedState calls here, the final state will be merged because each useSyncedState is "applied" separately!

Setting multiple synced state

```
// yieldingcolor="red", size="medium"
```

Of course, this isn't always a good thing! In certain cases, you might want to validate that only certain combinations are allowed! This would be a good use case to combine state values into a single `useSyncedState` hook.

[

Previous

Setting Editor Type

](/docs/widgets/setting-editor-type/)[

Next

Handling User Events

](/docs/widgets/handling-user-events/)

*   When to use useSyncedState vs. useSyncedMap
*   When to use one vs. many useSyncedState

---

# Stability and Updates | Developer Docs

Source: https://developers.figma.com/docs/widgets/stability-and-updates/

*   [](/)
*   Widgets
*   Other
*   Stability and Updates

# Stability and Updates

This section is about:

*   How new API updates are released.
*   How the Figma team provides stability to **published** widgets.

Even though the widget API might change and is currently in active development, it is important that inserted published widgets don't break all the time. Once a widget is published and subsequently inserted, we make sure to respect its `manifest.widgetApi` version to ensure backwards compatibility with subsequent API updates.

On the other hand, we also want to strike the right balance between providing new functionality quickly and there are times when breaking changes might be unavoidable. Below is how we intend to do that.

## API Versioning and changes​

Changes to the widget API are identified as "Version X, Update Y". The first number "X" represents the major version number, and the second number "Y" represents minor updates.

info

Additionally because widgets also use the Plugin API heavily, widgets also have to contend with the plugin api version. See also [stability](/docs/plugins/stability-updates/) in the Plugin API documentation.

Whenever we release a breaking widget API version, we'll update corresponding `manifest.widgetApi` value and the latest publish types on npm accordingly.

## Updating your widget safely​

Whenever you update your widget, it's important to keep in mind any existing widgets that are already in FigJam files.

info

For stability, existing widgets in files will continue to run the same version of the widget, while newly inserted widgets will always run the latest version of the widget.

We're actively working on a way to safely update existing widgets to their latest version, so it's important to keep these guidelines in mind to ensure widgets can be safely updated in the future.

Here are some helpful guidelines to help ensure that your widgets are stable across published releases:

**Never rename names for `useSyncedState` & `useSyncedMap`**

Here's an example of a destructive change that should be avoided:

Destructive synced state change

```
// Beforeconst [count, setCount] = useSyncedState("count", 0)// After (WARNING: This is an example of what NOT to do)const [count, setCount] = useSyncedState("widgetCount", 0)
```

With this change, any existing with with widget state stored at `"count"` will no longer read from `"count"`, which will effectively "reset" already inserted widgets. Users who were previously interacting with your widget will lose their data because existing widgets will have their counts reset after the update.

**Make sure that code changes are backwards compatible**

It is very important that the shape/type of values stored in your widget state is backwards compatible.

Here is an example of a dangerous code change to make across versions:

Dangerous change to default synced state

```
// Beforeconst [config, setConfig] = useSyncedState("config", {  size: "large",  color: "red"})// After (WARNING: This is an example of what NOT to do)const [config, setConfig] = useSyncedState("config", {  size: "large",  color: "red",  shape: "circle" // <--- Added this key to the default value.})
```

Just by looking at the code in "after", you might think at that `config.shape` will always exist! However, this is not true because existing widgets will have `config` already set to an old value and will not have the `"shape"` key. The default value passed to `useSyncedState` is all-or-nothing - it is only used as the value if a value doesn't already exist!

[

Previous

Testing

](/docs/widgets/testing/)[

Next

Samples

](/docs/widgets/samples/)

*   API Versioning and changes
*   Updating your widget safely

---

# API Reference | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/api-reference/

*   [](/)
*   Widgets
*   Overview
*   API Reference

# API Reference

The Widget API allows you to create custom, interactive objects that extend the functionality of Figma design files and FigJam boards. You’ll likely use both the widget API and plugin API when building widgets.

*   Widget API: defines the custom object and how people can interact with it
*   Plugin API: access external resources or manipulate other nodes in the file

The Widget API is a component-based API similar to React. It gives you access to the tools you need to build a widget node on the canvas that responds to a variety of interactions.

There are three main aspects of the Widget API: components, functions, and hooks. Together they control rendering the widget in a file and managing its [state](/docs/widgets/widget-state/) as you interact with it.

If you’ve used the Plugin API, you’ll already be familiar with the `figma` global object. You can access the Widget API from that same `figma` object, via `figma.widget`.

## Components​

Components are the layers you’ll use to build your custom interactive widget. You can think of them as building blocks.

Each component supports a range of properties, which you can use to customize their appearance. Some properties are shared across components and some are unique to specific components.

There are components based on layers or node types you can already find and use in files:

*   [`AutoLayout`](/docs/widgets/api/component-AutoLayout/)
*   [`Frame`](/docs/widgets/api/component-Frame/)
*   [`Text`](/docs/widgets/api/component-Text/)
*   [`Rectangle`](/docs/widgets/api/component-Rectangle/)
*   [`Image`](/docs/widgets/api/component-Image/)
*   [`Ellipse`](/docs/widgets/api/component-Ellipse/)
*   [`SVG`](/docs/widgets/api/component-SVG/)
*   [`Line`](/docs/widgets/api/component-Line/)

There are three other components available that aren’t based on layers:

*   [`Input`](/docs/widgets/api/component-Input/): allows you to make a text component editable. This makes it possible for people to input or update text components within the widget.
*   [`Fragment`](/docs/widgets/api/component-Fragment/): allows you to render children without having to group them in a parent node. You can't pass properties to a fragment.
*   [`Span`](/docs/widgets/api/component-Span/): allows you to style ranges of text inside of a `Text` component.

## Functions​

Functions are statements or blocks of code that perform a specific task. Functions accept parameters and other data as input and return a related output. There are only two functions defined in the Widget API:

*   [`register`](/docs/widgets/api/properties/widget-register/): the main entry point for rendering a widget. This function expects a widget function that describes your widget and returns the widget node made up of the components we mentioned above.
*   [`waitForTask`](/docs/widgets/api/properties/widget-waitfortask/): this function enables asynchronous work, such as data fetching. It accepts a promise and only terminates when that promise resolves.
*   [`colorMapToOptions`](/docs/widgets/api/properties/widget-colormaptooptions/): this function is called on a color palette defined in `figma.constants.colors.*`, and returns `WidgetPropertyMenuColorSelectorOption[]`.

## Hooks​

Hooks are a specific type of function. They allow you to reuse state-based logic or behavior across your components. You can identify hooks by their `use` prefix.

*   [`useEffect`](/docs/widgets/api/properties/widget-useeffect/): this hook can run any time the widget's state changes. It allows you to perform asynchronous tasks, bundle calls, or consolidate the side-effects of event handlers.
*   [`usePropertyMenu`](/docs/widgets/api/properties/widget-usepropertymenu/): this hook allows you to define an interactive property menu that displays when the widget is selected.
*   [`useStickable`](/docs/widgets/api/properties/widget-usestickable/): this FigJam only hook allows your widget to be stuck to other nodes in the file. This is similar to how stamps work in FigJam files.
*   [`useStickableHost`](/docs/widgets/api/properties/widget-usestickablehost/): this FigJam only hook allows other nodes in the file to stick to your widget.
*   [`useSyncedState`](/docs/widgets/api/properties/widget-usesyncedstate/): this hook declares that rendering your widget relies on a changeable state. You give this hook a key and default value, which you can use and update across different states.
*   [`useSyncedMap`](/docs/widgets/api/properties/widget-usesyncedmap/): this hook also allows you to manage widget state. You can give this hook multiple keys and values and update widget state based on changes to individual values, not the entire map. This allows you to accurately render widget state when multiple people interact with a widget at once.
*   [`useWidgetId`](/docs/widgets/api/properties/widget-usewidgetid/): this hook allows you to reference a currently active widget. It returns a unique `id` which allows you to reference that WidgetNode in the Plugin API.

## Destructure globals​

We recommend [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring) components, hooks, and functions at the beginning of your widget code. This saves you from having to reference each of these components by their qualified names, such as `figma.widget.AutoLayout`.

```
const { widget } = figmaconst {  // Components  AutoLayout,  Frame,  Text,  Input,  Rectangle,  Image,  SVG,  Ellipse,  Line,  Fragment,  // Hooks  useSyncedState,  useSyncedMap,  usePropertyMenu,  useEffect,  useStickable,  useStickableHost,  useWidgetId,  // Functions  register,  waitForTask} = widget
```

In our sample counter widget, we’ve done this to `figma.widget` as well as the individual hooks (`useSyncedState` and `usePropertyMenu`) and components (`AutoLayout`, `Text`, `SVG`) we’ll use in our widget code:

```
const { widget } = figmaconst { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG } = widget
```

[

Next

Widget Manifest

](/docs/widgets/widget-manifest/)

*   Components
*   Functions
*   Hooks
*   Destructure globals

---

# Handling User Events | Developer Docs

Source: https://developers.figma.com/docs/widgets/handling-user-events/

*   [](/)
*   Widgets
*   Development Guides
*   Handling User Events

# Handling User Events

There are many ways a user can interact with a widget:

*   Click listeners
*   Property menus
*   [Text Editing](/docs/widgets/text-editing/)
*   iFrames
*   Stickable Hooks
    *   Making a Widget Stickable
    *   Making a Widget a Stickable Host
*   [Hover States](/docs/widgets/adding-hover-states/)

## Click listeners​

![onclick](/assets/images/widget_onclick-1ce6731a525f216c600e6d5b6e107f2d.gif)

Widget are able to register event listeners that respond to user events. For now, we only support `click` events on nodes inside the widget

Here’s an example of a widget that writes to the JavaScript console on click

Simple click handler

```
const { widget } = figmaconst { Text } = widgetfunction ConsoleWidget() {  return <Text onClick={() => console.log('Hey!')}>Click me</Text>}widget.register(ConsoleWidget)
```

When a user clicks on a widget, we run the function passed to the `onClick` prop and terminate the widget thereafter. However there are cases where it might be useful keep the widget running for longer. An example of this is if your click handler opens an iframe to get additional input from the user.

We want to keep the widget running as long as the iframe is open, to enable this type of long-lived event handlers, we also support `async` callbacks to indicate that the Widget shouldn’t be terminated immediately.

Here’s an example that using async / await in a click handler:

Async click handler

```
const { widget } = figmaconst { Text } = widgetfunction AsyncClickWidget() {  return (    <Text      onClick={async () => {        const fonts = await figma.listAvailableFontsAsync()        // Do stuff      }}    >      Click me    </Text>  )}widget.register(AsyncClickWidget)
```

If your callback returns a promise, your widget will only be terminated once the promise has been resolved, or when `figma.closePlugin()` is called.

Returning a promise in click handler

```
const { widget } = figmaconst { Text } = widgetfunction PromiseWidget() {  return (    <Text      onClick={() =>        new Promise((resolve) => {          setTimeout(() => {            console.log('This is a delayed action')            resolve(null)          }, 1000)        })      }    >      Click me    </Text>  )}widget.register(PromiseWidget)
```

In the above example the onClick handlers that we passed into our components didn't take any arguments. The function that you pass to the onClick prop can take an argument provides information about where the user clicked on the screen.

Click coordinates in click handler

```
const { widget } = figmaconst { Frame } = widgetfunction XYWidget() {  return (    <Frame      width={200}      height={200}      fill="#f00"      onClick={(event) => {        // offsetX and offsetY are useful for getting the position of the        // mouse relative to the component that was clicked. You could use        // these coordinates to position something inside of the frame.        console.log('offset coords:', event.offsetX, event.offsetY)        // canvasX and canvasY are relative to the canvas itself.        // You can use these to position objects outside of        // the widget relative to the canvas.        console.log('canvas coords:', event.canvasX, event.canvasY)      }}    />  )}widget.register(XYWidget)
```

## Property menus​

![Property menu](/assets/images/widget_property_menu-6c38e8d52bc63b92f3bd558c18372088.png)

A property menu is an optional menu that can be shown when you select your widget. We recommend using property menus only when there are secondary actions that cannot be done directly on the widget, such as formatting and settings.

Here's an example of a widget that shows a property menu with two items:

Simple property menu

```
const { widget } = figmaconst { Text, usePropertyMenu } = widgetfunction PropertyMenuExample() {  usePropertyMenu(    [      {        tooltip: 'One',        propertyName: 'one',        itemType: 'action',      },      {        tooltip: 'Two',        propertyName: 'two',        itemType: 'action',      },    ],    (e) => {      console.log(e.propertyName)    },  )  return <Text>Select Me</Text>}widget.register(PropertyMenuExample)
```

For more information, refer to the documentation on [usePropertyMenu](/docs/widgets/api/properties/widget-usepropertymenu/).

## iFrames​

![Widget iFrame](/assets/images/widget_iframe-564a594a9ee78a3019748b56a78245a9.gif)

For more complex input methods (such as a textbox), you can open an iFrame window to receive the input.

info

For more information on setting up a separate `ui.html` page, refer to the [Creating a User Interface](/docs/plugins/creating-ui/) guide from the plugin docs.

In `code.tsx`, the iFrame html is setup in-line of the `figma.showUI()` method, where the value of the textbox is sent to the parent.

Setting up the `figma.ui.onmessage` handler inside of `useEffect()` will ensure that the handler is set when the widget mounts. In this example, the name received from the iFrame is used to update the `name` state in the widget. Once the name has been set, the iFrame is closed by calling [`figma.closePlugin()`](/docs/plugins/api/properties/figma-closeplugin/).

Using iframes in widgets

```
const { widget } = figmaconst { Text, useSyncedState, useEffect } = widgetfunction IFrameExample() {  const [name, setName] = useSyncedState('name', '[Enter your name]')  useEffect(() => {    figma.ui.onmessage = (message) => {      if (message.type === 'name') {        setName(message.name)        figma.closePlugin()      }    }  })  return (    <Text      onClick={() => {        return new Promise((resolve) => {          figma.showUI(`            <input id="name" type="text" placeholder="Name">            <button id="submit">Submit</button>            <script>              document.getElementById('submit').onclick = () => {                const textbox = document.getElementById('name')                const name = textbox.value                const message = { pluginMessage: {type: 'name', name} }                parent.postMessage(message, '*')              }            </script>        `)        })      }}    >      Hello {name}    </Text>  )}widget.register(IFrameExample)
```

## Stickable Hooks​

In FigJam a **stickable** is any node that sticks to other nodes when put on top of them. Currently FigJam has two built-in stickables: `STAMP` and `HIGHLIGHT` nodes. In addition you can now define a `WIDGET` node as being stickable if it uses the [`useStickable`](/docs/widgets/api/properties/widget-usestickable/) hook.

Your widget can either be **stickable** and stick to other nodes like stamps or it can be a **stickable host** and allow stickables to stick to it.

It should be noted that your widget can either be a **stickable** or a **stickable host** but not both.

### Making a Widget Stickable​

If a widget is declared as a stickable it will attach itself to all other non stickables in the document. When your widget node is "stuck" to another node it will move along with the element it is attached to unless the stickable is dragged off of its stickable host.

In this example below you can see that the widget sticks to this sticky note when dragged over top of it.

![Example of useStickable](/assets/images/stick-3f2d37ec3e87c7b7f18be914ae9c74ad.gif)

To make a widget a **stickable** you can use the [`useStickable`](/docs/widgets/api/properties/widget-usestickable/). hook.

### Making a Widget a Stickable Host​

If a widget is a stickable host that means that stickables are allowed to attach themselves to that widget. By default all widgets are stickable hosts unless they call [`useStickable`](/docs/widgets/api/properties/widget-usestickable/).. This means that out of the box, stamps and highlights will stick to your widget.

If you would like your widget to run code when you stick something to it you can use the [`useStickableHost`](/docs/widgets/api/properties/widget-usestickablehost/). hook to define a callback that should run when a stickable is attached to it.

info

Note that calling [`useStickableHost`](/docs/widgets/api/properties/widget-usestickablehost/). will not make any nodes other than stamp, highlight, and stickable widget nodes stick to your widget.

Below you can see an example of a widget that uses [`useStickableHost`](/docs/widgets/api/properties/widget-usestickablehost/). to count the number of attached stamps when a new stamp is stuck to it.

![Example of useStickableHost](/assets/images/stick-host-e2340c890d1d691f321c6c2269cd2a38.gif)

[

Previous

Widget State & Multiplayer

](/docs/widgets/widget-state-and-multiplayer/)[

Next

Making Network Requests

](/docs/widgets/making-network-requests/)

*   Click listeners
*   Property menus
*   iFrames
*   Stickable Hooks
    *   Making a Widget Stickable
    *   Making a Widget a Stickable Host

---

# Using the Plugin API | Developer Docs

Source: https://developers.figma.com/docs/widgets/using-the-plugin-api/

*   [](/)
*   Widgets
*   Basics of Widgets
*   Using the Plugin API

# Using the Plugin API

As you probably already figured out, the widget API and [plugin API](/docs/plugins/) are very much related and meant to be used together when building widgets.

The plugin API can only be used in event handlers and hooks.

You can think of this model as:

1.  The Widget API is an interface to describing what goes on the canvas
2.  The Plugin API is an interface to manipulate things on the canvas

Consequently, you might find that your widget code looks very much like the following pseudocode:

Using the Plugin API

```
const { widget } = figmaconst { AutoLayout, Text, useWidgetId } = widgetfunction AverageWidget() {  const widgetId = useWidgetId()  return (    // Use the Widget JSX API here to describe how to render the widget!    <AutoLayout      onClick={() => {        // Use Plugin API here in response to user interactions!        const widgetNode = await figma.getNodeByIdAsync(widgetId) as WidgetNode      }}    >      <Text>Hello</Text>    </AutoLayout>  )}widget.register(AverageWidget)
```

[

Previous

Prototyping Widget UI

](/docs/widgets/prototyping-widget-ui/)[

Next

Working with Widgets

](/docs/widgets/working-with-widgets/)

---

# Setting Editor Type | Developer Docs

Source: https://developers.figma.com/docs/widgets/setting-editor-type/

*   [](/)
*   Widgets
*   Basics of Widgets
*   Setting Editor Type

# Setting Editor Type

Widgets are custom interactive objects that run in Figma design and FigJam files.

These environments support the kinds of work you would do at each stage of the design process. Whether you're brainstorming and workshopping or working on high-fidelity designs. [Compare Figma and FigJam →](https://help.figma.com/hc/en-us/articles/1500004290201-Compare-Figma-and-FigJam)

The Plugin and Widget APIs treat Figma design and FigJam files as different editor types. You can create widgets for a specific editor type or both editor types. You can even create widgets that do different things in each editor.

For your widget to work, you need to declare which editor type(s) your widget can run in. You can do this by setting the `editorType` field in the widget’s manifest.

```
{  "name": "MyWidget",  "id": "737805260747778093",  "api": "1.0.0",  "widgetApi": "1.0.0",  "editorType": ["figma", "figjam"],  "containsWidget": true  "main": "code.js",  "ui": "ui.html"}
```

tip

📝 **Note**: Declaring an editor type impacts which files your published plugin can run in. During the development process, you can insert and run widgets in both file types.

## Supported APIs​

When you declare a specific editor type, you can only access APIs that are available on that editor type.

You can access a majority of the Widget API in both editor types. This includes components and their supported properties.

There are some features of the Widget (and Plugin) API that are only supported on certain editor types. For example: stickable hooks are only supported in FigJam files. To learn more about these differences, you can read the [Figma design or FigJam files](/docs/widgets/figma-figjam-widgets/) guide.

## Choosing an editor type​

Create widgets that run in a specific editor type. This is useful when your widget is best suited to a certain environment.

*   To create a widget that only runs in FigJam files:

```
"editorType": [  "figjam"],
```

*   To create a widget that only runs in Figma design files:

```
"editorType": [  "figma"],
```

Create widgets that run in both editor types. This gives people more flexibility when using your widget. To create a widget that works in both editors:

```
"editorType": [  "figjam",  "figma"],
```

If you want to set conditional logic, you can use the method `figma.editorType`. This will return a string value of either `"figma"` or `"figjam"`.

```
if (figma.editorType === 'figjam') {  figma.createShapeWithText();}
```

tip

📝 **Note:** As we mentioned above, there are some functions that aren’t supported in both editor types. This means people using your widget may have different experiences across file types.

You can help set expectations with clear signifiers and instructions, and detailed error messages. [Testing your widget →](/docs/widgets/testing/)

[

Previous

Working with Widgets

](/docs/widgets/working-with-widgets/)[

Next

Widget State & Multiplayer

](/docs/widgets/widget-state-and-multiplayer/)

*   Supported APIs
*   Choosing an editor type

---

# useStickable | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/properties/widget-usestickable/

*   [](/)
*   Widgets
*   Global Objects
*   [figma.widget](/docs/widgets/api/figma-widget/)
*   useStickable

# useStickable

info

This API is only available in FigJam

`useStickable` is a hook that makes your widget stick to other nodes when dragged over them. This behavior is similar to how stamp nodes work in Figma.

## Signature​

### [useStickable](/docs/widgets/api/properties/widget-usestickable/)(onStuckStatusChanged?: (e: [WidgetStuckEvent](/docs/widgets/api/type-WidgetStuckEvent/#widget-stuck-event)) => void | Promise<void>): void

## Parameters​

Parameter

Description

`onStuckStatusChanged`

An optional callback that is called whenever a widget is stuck or removed from a node. It takes a **[`WidgetStuckEvent`](/docs/widgets/api/type-WidgetStuckEvent/)** as an argument.

## Remarks​

### Basic Usage​

useStickable without callback

```
const { useStickable, Rectangle } = figma.widget;function Widget() {  // This widget sticks to other nodes now!  useStickable();  return <Rectangle width={100} height={100} fill="#F00" />;}figma.widget.register(Widget);
```

![Gif of widget sticking to a sticky note](/assets/images/stick-3f2d37ec3e87c7b7f18be914ae9c74ad.gif)

### Example​

This example changes the color of the widget depending on what type of node it is stuck to.

useStickable with callback

```
const { useStickable, Rectangle, useWidgetId, useSyncedState } = figma.widget;function Widget() {  const widgetId = useWidgetId();  const [color, setColor] = useSyncedState("color", "#000");  // This widget sticks to other nodes now!  useStickable(() => {    const widget = figma.getNodeById(widgetId);    const { stuckTo } = widget;    if (!stuckTo) {      // Set the color to black if the widget isn't stuck to anything.      setColor("#000");      return;    }    switch (stuckTo.type) {      case "STICKY":        // Make the widget red if we are attacked to a sticky        setColor("#F00");        return;      case "SHAPE_WITH_TEXT":        // Make the widget green if we are attached to a shape with text        setColor("#0F0");        return;      default:        // If we are attached to anything else make the widget blue        setColor("#00F");        return;    }  });  return <Rectangle width={100} height={100} fill={color} />;}figma.widget.register(Widget);
```

### Other Rules​

*   In FigJam a node is either a stickable or a stickable host, but never both.
*   You cannot call `useStickable` and `useStickableHost` in the same render of a widget; it can only be one or the other.
*   By default all widgets are stickable hosts and can let stamps and other stickables stick to them.

[

Previous

useEffect

](/docs/widgets/api/properties/widget-useeffect/)[

Next

useStickableHost

](/docs/widgets/api/properties/widget-usestickablehost/)

*   Signature
*   Parameters
*   Remarks
    *   Basic Usage
    *   Example
    *   Other Rules

---

# useStickableHost | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/properties/widget-usestickablehost/

*   [](/)
*   Widgets
*   Global Objects
*   [figma.widget](/docs/widgets/api/figma-widget/)
*   useStickableHost

# useStickableHost

info

This API is only available in FigJam

`useStickableHost` lets your widget run a callback when a stickable is added or removed to your widget. By default all widgets are already stickable hosts so you don't have to call this if you just want stamps to stick to your widget.

## Signature​

### [useStickableHost](/docs/widgets/api/properties/widget-usestickablehost/)(onAttachmentsChanged?: (e: [WidgetAttachedStickablesChangedEvent](/docs/widgets/api/type-WidgetAttachedStickablesChangedEvent/#widget-attached-stickables-changed-event)) => void | Promise<void>): void

## Parameters​

Parameter

Description

`onAttachedStickablesChanged`

An optional callback that is called whenever stickables are added or removed from this widget. It takes a **[`WidgetAttachedStickablesChangedEvent`](/docs/widgets/api/type-WidgetAttachedStickablesChangedEvent/)** as an argument.

## Remarks​

### Example​

This widget is a rectangle that you can stamps in and it will display how many of each stamp type are present on the widget.

Stamp Vote with useStickableHost

```
function StampVote() {  const [votes, setVotes] = useSyncedState("votes", {});  const widgetID = useWidgetId();  useStickableHost(() => {    const widget = figma.getNodeById(widgetID);    if (!widget) {      return;    }    const newVotes: { [key: string]: number } = {};    const { stuckNodes } = widget;    for (const node of stuckNodes) {      if (!node || node.type !== "STAMP") {        continue;      }      newVotes[node.name] = newVotes[node.name] || 0;      newVotes[node.name] += 1;    }    setVotes(newVotes);  });  return (    <AutoLayout      fill={"#FFFFFF"}      stroke={"#E6E6E6"}      padding={16}      direction="vertical"      width={300}      height={300}      verticalAlignItems="end"    >      {Object.keys(votes).map((name) => (        <Text>          {name}: {votes[name]}        </Text>      ))}    </AutoLayout>  );}
```

### Other Rules​

*   In FigJam a node is either a stickable or a stickable host, but never both.
*   You cannot call `useStickable` and `useStickableHost` in the same render of a widget; it can only be one or the other.
*   By default all widgets are stickable hosts and can let stamps and other stickables stick to them.
*   Calling `useStickableHost` doesn't let non stickables attach to your widget.

[

Previous

useStickable

](/docs/widgets/api/properties/widget-usestickable/)[

Next

waitForTask

](/docs/widgets/api/properties/widget-waitfortask/)

*   Signature
*   Parameters
*   Remarks
    *   Example
    *   Other Rules

---

# Widget State | Developer Docs

Source: https://developers.figma.com/docs/widgets/widget-state/

*   [](/)
*   Widgets
*   Basics of Widgets
*   Widget State

# Widget State

Every instance of a widget has its own state. You can think of a widget’s state as its data representation. A widget with the same state should always render the same output. **If you want to change how a widget looks in response to a user interaction, you should update its state!**

Here’s an example of a widget that increments a count for every click:

Increment count with synced state

```
const { widget } = figmaconst { Text, useSyncedState } = widgetfunction SimpleCounter() {  const [count, setCount] = useSyncedState("count", 0)  return (    <Text      onClick={() => {        setCount(count + 1)      }}    >      {count}    </Text>  )}widget.register(SimpleCounter)
```

info

We interchangeably refer to a widget's state as synced state because all of a widget's state is currently synced across all clients. In the future, we intend to support things like local state but for now all state is synced state.

We use the `useSyncedState` hook above to declare a data value on the widget that defaults to `0`. Under-the-hood, you can think of this widget's state as a JSON object that looks like this:

caution

If you have multiple `useSyncedState` calls, make sure you give them unique keys!

```
// initially{  "count": 0}// click once{  "count": 1}// click again{  "count": 2}
```

Each time this object gets updated, the associated widget is re-rendered to reflect the changes. Any JSON serializable value is a valid state value.

[

Previous

How Widgets Run

](/docs/widgets/how-widgets-run/)[

Next

Prototyping Widget UI

](/docs/widgets/prototyping-widget-ui/)

---

# Prototyping Widget UI | Developer Docs

Source: https://developers.figma.com/docs/widgets/prototyping-widget-ui/

*   [](/)
*   Widgets
*   Basics of Widgets
*   Prototyping Widget UI

# Prototyping Widget UI

Once you have created a widget, the best way to see how it looks is to insert it in a file. This allows you to preview your widget interface, as well as test any interaction.

## Insert widgets​

The Widget API supports two file or editor types: FigJam and Figma. You can create widgets for FigJam or Figma, or widgets that run in both. You’ll [set the editor type](/docs/widgets/setting-editor-type/) as part of your widget’s [manifest](/docs/widgets/widget-manifest/).

During the development process, you can insert widgets into either editor type. This is regardless of the `editorType` set in the widget's manifest.

tip

💡 If you haven’t created a widget yet, you can follow our [QuickStart](/docs/widgets/setup-guide/) guide to download a sample counter widget. This will give you an idea of how this process works, without having to creating your widget from scratch.

### Figma design​

Insert widgets into FigJam files to preview designs and test their interactivity. In design files, you can also view and adjust the properties of your widget’s sublayers.

You can use this functionality to explore and iterate on your widget’s design.

1.  Using the [**Figma Desktop app**](https://www.figma.com/downloads/), open the design file where you want to insert the widget.
2.  In the toolbar, open the **Component, widget, and plugins** insert menu and select the **Widget** tab.

![Inserts - Toolbar](https://static.figma.com/uploads/52a7ab67b4808eb848edff47e22cc6c4fe40a4c4)

3.  Click the **Recents** header and select **Development** from the options. If you don’t see this option, make sure you are in the desktop app and have created a widget.

![Inserts - Development](https://static.figma.com/uploads/92707ba28af6adf7899e8562ce5eb899504cb3d0)

4.  Select the widget from the list of options. Figma will insert the widget into the file.

### FigJam​

Insert widgets into FigJam files to preview designs and test their interactivity. You can’t view or edit individual layers and properties in FigJam files.

1.  Open a FigJam file in the desktop app.
2.  In the bottom toolbar, select **Widgets, stickers, templates, and more**.

![FigJam insert - toolbar](https://static.figma.com/uploads/9d69c1986abaebf302cf46f8e23d90d03638c715)

3.  Select the **Widgets** tab.
4.  In the **Development** section, select the widget you want to insert:

![FigJam insert widgets](https://static.figma.com/uploads/6ccd79387442727d0fd416246bcb8e830d111275)

info

📝 You can also insert widgets from the Figma icon menu or right-click menu. Select the Figma icon in the toolbar or right-click anywhere on the canvas. Go to **Widgets > Development** and select your widget to install it.

## Widget state and rendering​

During the development process, you’ll likely want to preview your changes in real time. If you select the widget in your file, that instance will re-render any time you make a change to the widget code.

This is called hot reloading. Hot reloading only updates the affected widget sublayers and preserves the widget’s state. This is useful when prototyping changes to your widget.

> For example: our selected counter widget has registered 3 clicks in the current file. In our code editor, we change the `fill` property of the `AutoLayout` component from the original white (`#FFFFFF`) to a light blue (`#F1F6FF`). The widget renders in the current file with the updated fill, while the counter stays at 3.

You can also force a widget to re-render at any time. The widget will render based on the current widget code.

1.  Right-click on the widget in the file.
2.  Hover over the **Widgets** menu.
3.  Select **Re-render widget** from the options:

![Rerender widget](https://static.figma.com/uploads/5eb99c5409df41d9e7c47034c48fb889fc439b10)

Every widget also has its own state. If you insert multiple widgets into a file, you can interact with each widget independently. If you want to restore a widget to it’s default value, you can reset its state:

1.  Right-click on the widget in the file.
2.  Hover over the **Widgets** menu.
3.  Select **Reset widget state** from the options:

![Reset state](https://static.figma.com/uploads/4040acb58e5f70469fff244d74fd17f9729e9852)

## Test interactions and events​

There are many ways widgets can [respond to interaction](/docs/widgets/handling-user-events/). Your widget doesn’t need to support all interactions. We recommend testing them anyway to make sure your widget responds as expected.

If you have used the [`hoverStyle`](/docs/widgets/api/type-HoverStyle/) property, you can check they work with the rest of your widget design.

info

📝 **Supported interactions**

*   Respond to clicks using event listeners
*   Interactions with a custom property menu
*   Accept text input from widget users
*   Adjust the appearance of a widget on hover
*   Open an iFrame to access external resources or browser APIs
*   Allow multiple people to interact with a widget at once
*   Stick widgets to other objects or allow other objects to stick to widgets (FigJam only)

**[Handling user events →](/docs/widgets/handling-user-events/)**

To reset a widget to it’s original state: right-click on the widget and select **Widgets > Reset widget state**. If you made any change to a component’s properties, these will also be reset.

For more tips on testing widget interactions, read our [Testing](/docs/widgets/testing/) guide.

## View and adjust widget sublayers​

tip

💡 **Want to design your widget in Figma first?**

Figma’s [Widget Code Generator](https://www.figma.com/community/plugin/1096460041736534298/Widget-Code-Generator) plugin generates widget UI from existing frames. This translates your design into components and properties in the widget API.

You’ll still need to edit the generated code to add interactivity and support user events. **[Use the Widget Code Generator plugin →](https://help.figma.com/hc/en-us/articles/5601345554967)**

If you insert a widget into a design file, you can view widget sublayers in the layers panel. This allows you to select individual layers and adjust their properties.

You can only view layers and adjust properties for widgets that are still in development. You can’t do this with published versions of the widget.

1.  Select the widget in the canvas.
    
2.  In the layers panel, look out for the purple widget layer. It will have the same name as your widget.
    
3.  Click the arrow to expand the widget and view its sublayers. There are a few differences in name and appearance between the product and API:
    
    *   The [`AutoLayout`](/docs/widgets/api/component-AutoLayout/) component shows as a **Frame** with an icon that matches the direction of the auto layout. This can be a horizontal or vertical auto layout.
    *   Any input components have a T icon and the actual string as the layer name. If you update the contents of the input, the layer name also updates.
    *   If an SVG component has many paths, they appear as frame layers. Any shapes that make up the SVG appear as vector sublayers.
    
    [**View layers in the left sidebar →**](https://help.figma.com/hc/en-us/articles/360039831974)
    

![Widget layers](https://static.figma.com/uploads/c178d2824afa77d1eced71ec64fd9479eb9358cd)

tip

💡 **Tip!** Hold down ⌘Command / Ctrl and click on a specific element in the canvas to select that layer. **[Select layers and objects in design files →](https://help.figma.com/hc/en-us/articles/360040449873)**

### Adjust properties of widget sublayers​

In Figma design files, you can also change the properties of the sublayers of a widget in the file. While this doesn’t update your widget code, it does allow you to preview changes before you commit them to code.

You can even insert multiple instances of the same widget and give them different properties. This is a great way to compare or iterate on designs during the development process.

*   Test a combination of auto layout properties
*   Preview changes to text, including font, size, and layout
*   Apply paints to fills and strokes

caution

⚠️ Any time your widget is re-rendered or reset, you will lose any updates you applied. This happens when you run or insert a widget, or if you use the **Re-render widget** or **Reset widget state** options. Widget state and rendering ↑

You can access most of these properties from the **Design** tab of the right sidebar. View the **Components** section of the [Widget API reference](/docs/widgets/api/api-reference/) to check supported properties.

![Adjust component](https://static.figma.com/uploads/0d1c56630edd117645f03f9110c50510281572a8)

For more information on updating properties, check out these help center articles:

*   [Explore auto layout properties](https://help.figma.com/hc/en-us/articles/360040451373)
*   [Explore text properties](https://help.figma.com/hc/en-us/articles/360039956634-Explore-text-properties)
*   [Basic shape tools in Figma design](https://help.figma.com/hc/en-us/articles/360040450133-Basic-shape-tools-in-Figma-design)
*   [Using the arc tool](https://help.figma.com/hc/en-us/articles/360040450173)
*   [Apply and adjust stroke properties](https://help.figma.com/hc/en-us/articles/360049283914-Apply-and-adjust-stroke-properties)
*   [Adjust alignment, rotation, and position](https://help.figma.com/hc/en-us/articles/360039956914-Adjust-alignment-rotation-and-position)

info

📝 To clear your changes, or return a widget to it’s original design, you can re-render the widget. Right-click on the widget and select **Widgets > Re-render widget**.

You can also use this setting if your widget stops working after you edit its properties.

### Copy widget sublayers from FigJam​

You can’t view or edit individual layers and properties of widgets in FigJam files. If you want to iterate on your widget’s design, you can still copy the existing widget as an entire frame.

This allows you to paste those layers in a design file and explore different designs. This is particularly helpful when configuring properties of `AutoLayout` components.

These layers are separate from the actual widget. You can explore alternative designs without your changes being overridden.

1.  Right-click on the widget.
2.  Select **Widgets > Copy as layers** to copy the widget to your clipboard.

![Copy as layers](https://static.figma.com/uploads/b7e3194d28146a475ab31252869fc57c7fafae86)

3.  Open a design file and right-click on a spot in the canvas.
4.  Select **Paste here** to add your widget as a regular frame.

[

Previous

Widget State

](/docs/widgets/widget-state/)[

Next

Using the Plugin API

](/docs/widgets/using-the-plugin-api/)

*   Insert widgets
    *   Figma design
    *   FigJam
*   Widget state and rendering
*   Test interactions and events
*   View and adjust widget sublayers
    *   Adjust properties of widget sublayers
    *   Copy widget sublayers from FigJam

---

# Working with Widgets | Developer Docs

Source: https://developers.figma.com/docs/widgets/working-with-widgets/

*   [](/)
*   Widgets
*   Basics of Widgets
*   Working with Widgets

# Working with Widgets

In order to ensure predictable and performant Widgets, here’s a list of things to keep in mind as you’re building them:

1.  A widget’s render function should depend only on values returned by `useSyncedState` OR `useSyncedMap`.
2.  Widgets appear the exact same to all users.
3.  The only way to update a widget is by updating its state, which will re-render the widget automatically.
4.  Many widgets can be in a file, but a user is only allowed to run one widget at a time.
5.  If a widget's manifest does not contain the `"documentAcces": "dynamic-page"` manifest field, then when the widget runs for the first time, all pages in the document are loaded. In very large or complex files, this can result in a significant delay (sometimes 20 to 30 seconds) as the file loads. Consider updating your widget to include the `documentAccess` manifest field, and only [load pages](/docs/plugins/accessing-document/) as needed.
6.  Widget code can be terminated at any time by the user / FigJam. Known events that would terminate widget code are:

*   a user leaves/closes the file
*   a user explicitly stops a long running widget via the visual bell
*   a user deletes the running widget
*   a user explicitly interacts with another widget in the file

[

Previous

Using the Plugin API

](/docs/widgets/using-the-plugin-api/)[

Next

Setting Editor Type

](/docs/widgets/setting-editor-type/)

---

# useSyncedState | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/properties/widget-usesyncedstate/

*   [](/)
*   Widgets
*   Global Objects
*   [figma.widget](/docs/widgets/api/figma-widget/)
*   useSyncedState

# useSyncedState

The `useSyncedState` hook lets you declare that your widget relies on some state. You give `useSyncedState` a storage key and a default value and it returns the current value stored and a function to update the value.

## Signature​

### [useSyncedState](/docs/widgets/api/properties/widget-usesyncedstate/)<T>(name: string, defaultValue: T | (() => T)): \[T, (newValue: T | ((currValue: T) => T)) => void\]

## Parameters​

Parameter

Description

`name`

A storage "key" to store this syncedState. It is important that this is unique across multiple `useSyncedState` calls in a single widget.

`defaultValue`

The default value to return if no existing value is found. Values have to be JSON serializable. You can also pass a function that returns a defaultValue, this is useful if `defaultValue` is expensive to compute or if it is a plugin api method that isn't allowed during widget rendering.

## Remarks​

info

If you're familiar with React, `useSyncedState` is very similar to `React.useState`. The main difference being that we require you to explicitly "key" your state values to explicitly manage the namespace of your widget state. This is important for widgets because syncedState lives across different clients who might be running different versions of your widget.

Whenever a state value is updated, the corresponding widget is re-rendered to reflect the latest "state" of the widget.

Updating state values is not allowed when rendering the widget. See [State Updating Code](/docs/widgets/how-widgets-run/#state-updating-code) for more information.

### Usage Example​

useSyncedState example

```
const { widget } = figmaconst { Text, useSyncedState } = widgetfunction SyncedStateExample() {  const [count, setCount] = useSyncedState("count", 0)  return (    <Text      onClick={() => {        // Update the count        setCount(count + 1)      }}    >      The count is: {count}    </Text>  )}widget.register(SyncedStateExample)
```

### Lazy initial state​

This is useful if your initial state is expensive or is a plugin api method that isn't allowed during widget rendering (eg. figma.activeUsers). Instead of specifying a value directly, you can specify a function that will only be called if a value doesn’t already exist.

Lazy initial state

```
function Widget() {  const [expensiveState, setExpensiveState] = useSyncedState("expensiveState", () => {    return expensiveStateComputation()  })  const [activeUsers, setActiveUsers] = useSyncedState("activeUsers", () => figma.activeUsers)  ...}
```

### Functional updates​

This is useful if your new state is computed using the previous state. Instead of setting the state directly with a value, you can pass a function that will be called with the current state value and set to the return value of the function.

Functional updates

```
function Widget() {  const [count, setCount] = useSyncedState("count", 0)  return (    <Text onClick={() => setCount(prevCount => prevCount + 1)}>     {count}    </Text>  )}
```

Besides `useSyncedState`, another way to store data on a widget is `useSyncedMap`. These have different characteristics and use cases. See [Widget State & Multiplayer](/docs/widgets/widget-state-and-multiplayer/) for more information on when you should use one over the other.

[

Previous

register

](/docs/widgets/api/properties/widget-register/)[

Next

useSyncedMap

](/docs/widgets/api/properties/widget-usesyncedmap/)

*   Signature
*   Parameters
*   Remarks
    *   Usage Example
    *   Lazy initial state
    *   Functional updates

---

# Widget Manifest | Developer Docs

Source: https://developers.figma.com/docs/widgets/widget-manifest/

*   [](/)
*   Widgets
*   Overview
*   Widget Manifest

# Widget Manifest

Each widget must define a `manifest.json` file. If you use the "Create new widget" option, Figma will automatically create a simple manifest for you.

Here’s an example of a widget manifest file:

info

This file is similar to the [plugin manifest](/docs/plugins/manifest/) with the additional `containsWidget` and `widgetApi` properties and without plugin-specific options like menus or relaunchButtons.

manifest.json

```
{  "name": "MyWidget",  "id": "737805260747778093",  "api": "1.0.0",  "widgetApi": "1.0.0",  "editorType": ["figma", "figjam"],  "containsWidget": true,  "main": "code.js",  "ui": "ui.html",  "documentAccess": "dynamic-page",  "networkAccess": {    "allowedDomains": ["none"]  }}
```

### name: string

The name of the widget, as it will appear in the menu.

* * *

### id?: string

The widget ID to publish updates to. This ID will be assigned to you by Figma and is typically obtained using the "Create new Widget" feature, which will generate a manifest file with a new `id`. You can also get a new widget ID at the time of publishing your widget.

* * *

### widgetApi: string

The version of the widget API used by the widget. The current widgetApi version is `"1.0.0"`. In the future, when there are more versions of the widget API, this will be used to ensure stability across widget versions. See [Stability and Updates](/docs/widgets/stability-and-updates/) for more information about updates to the api.

**We recommend updating to the latest version whenever possible** to get the latest features, bug fixes, and documentation.

* * *

### containsWidget: true

All widget manifests should have this set to true.

* * *

### editorType: ('figma' | 'figjam')\[\]

This allows you to specify the editor that your widget is intended for and will impact which editor your widget appears in.

The types we support currently are:

```
"editorType": ["figma"]"editorType": ["figjam"]"editorType": ["figma", "figjam"]
```

* * *

### main: string

The relative file path to the JavaScript code of your widget.

* * *

### ui?: string | { \[key: string\]: string }

Used to specify HTML file/files that can be used in the iframe modal via `figma.showUI`, if you choose to have one.

*   If a single string is specified, this is the relative file path to the HTML file whose contents will be available as a string in the Javascript code via the constant [`__html__`](/docs/plugins/api/api-reference/#html).
*   If a map is specified, each entry of the map will be available at [`__uiFiles__`](/docs/plugins/api/api-reference/#uifiles)

* * *

### documentAccess?: 'dynamic-page'

This field ensures the widget supports dynamic page loading. The field is required for all new widgets and the value must be `dynamic-page`.

*   If the manifest field is included, then the widget will run immediatley.
*   If the manifest field is not included, then when the widget is run or interacted with for the first time after a user opens a file, the entire file will load and Figma will show a "Loading n pages for widget…" notification, where `n` is the number of pages being loaded.

If your existing widget's manifest doesn't include this field, you should [migrate your widget to use dynamic page loading](/docs/plugins/migrating-to-dynamic-loading/).

note

This field is required for all new widgets and new versions of widgets.

* * *

### networkAccess?: NetworkAccess

caution

This property is currently in public beta and is subject to change.

Used to specify the list of domains that your widget is permitted to access. When `networkAccess` is used:

*   Your widget can only access the domains that you specify. If your widget attempts to access other domains, the widget is prevented from doing so.
    
    note
    
    The enforcement of network access is limited only to requests made by the widget, such as requests to a public API. In a situation such as a widget rendering a website in a frame, network access limits only apply to the website's domain. Network access limits don’t affect the website’s resources.
    
*   The list of domains that your widget can access is displayed on your widget's Community page.
    

`networkAccess` has the following properties:

*   `allowedDomains` is a required list of strings. The strings are match patterns for domains that your widget is permitted to access. If `networkAccess` is used, `allowedDomains` must include at least one pattern. Optionally, patterns can start with one of the permitted schemes: `http`, `https`, `ws`, or `wss`. The `*` character may be used as a wildcard for subdomains, or used to represent all domains.
*   `reasoning` is a usually-optional string that describes why your widget needs to access the allowed domains. `reasoning` is required if:
    *   Your `allowedDomains` list includes `"*"`
    *   Your `allowedDomains` list includes local or development servers. If you only need local or development servers for development, please use `devAllowedDomains` instead.
*   `devAllowedDomains` is an optional list of strings. The strings are match patterns for domains that your widget is permitted to access during development. You can use most of the same patterns in `devAllowedDomains` as you can in `allowedDomains`.

Valid patterns for `allowedDomains`:

*   `["none"]`: The widget cannot access any external network resources. Note that we preload the Inter font for use in widgets, so you don't need to include an Inter font source in your allowedDomains.

Valid patterns for `allowedDomains` and `devAllowedDomains`:

*   `["*"]`: The widget may access any external network resources. If this pattern is included in `allowedDomains`, the `reasoning` property is required.
*   `["*.example.com"]`: The `*` character can be used to permit all subdomains of a given domain.
*   `["http://example.com", "https://example.com", "ws://example.com", "wss://example.com"]`: `http`, `https`, `ws`, and `wss` are permitted schemes that can be used to prefix domains. Other schemes, such as `file`, cannot be used.
*   `["api.example.com/rest/get", "www.example.com/images/", "http://s3.amazonaws.com/example_bucket/"]`: URLs to specific resources can be used.
*   `["example.com", "figma.com"]`: Domains can be used without schemes, subdomains, or wildcards.
*   `["http://localhost", "https://localhost", "http://localhost:3000", "http://localhost:8081"]`: During development, the widget can access a local/development web server. If the server is running on a port other than port 80, the port number can be provided after the URL. If this pattern is included in `allowedDomains`, the `reasoning` property is required.

note

In the previous example, the trailing slash in `www.example.com/images/` identifies a path to multiple resources. For example, `www.example.com/images/` lets a widget access images at `www.example.com/images/img1.png` and `www.example.com/images/img2.png`.

A pattern with _no_ trailing slash blocks any deeper access to files on that path. For example, `api.example.com/rest/get` stops a widget from accessing `api.example.com/rest/get/exampleresource.json`. This can be useful, for example, if your widget uses a REST API endpoint and you want to restrict the widget to that endpoint only.

For example:

```
"networkAccess": {  "allowedDomains": [    "figma.com",    "*.google.com",    "https://my-app.cdn.com",    "wss://socket.io",    "example.com/api/",    "exact-path.com/content"  ],  "devAllowedDomains": [    "http://localhost:3000"  ]}
```

More formally,

```
interface NetworkAccess {  allowedDomains: string[]  reasoning?: string  devAllowedDomains: string[]}
```

* * *

### build?: string

**Experimental!** A shell command to run before we load the file specified in `main` and `ui`. This can be used to call build commands such as compiling with Typescript, running Webpack, etc. The command is run in the directory of the manifest.

* * *

## Plugin API Specific Options​

Here are some plugin specific manifest options that are also applicable to widgets:

### api: string

The version of the Figma Plugin API used by the widget. **We recommend updating to the latest version whenever possible** to get the latest features, bug fixes, and documentation.

* * *

### permissions?: PermissionType\[\]

This allows you to specify what permissions your widget wants access to.

```
type PermissionType = "currentuser" | "activeusers"
```

info

`activeuser` must be specified if your widget uses `figma.activeUser` and `currentuser` must be specified if your widget uses `figma.currentUser`.

* * *

### enableProposedApi?: boolean

See [Plugin Proposed API](/docs/plugins/proposed-api/).

caution

This flag is only meant for development, and will not work in published widgets!

* * *

### enablePrivatePluginApi?: boolean

This enables Plugin API that's specific to private widgets. Setting this will also enable local widgets to work with these APIs during development.

* * *

[

Previous

API Reference

](/docs/widgets/api/api-reference/)[

Next

The Typings File

](/docs/widgets/api/typings/)

*   Plugin API Specific Options

---

# Making Network Requests | Developer Docs

Source: https://developers.figma.com/docs/widgets/making-network-requests/

*   [](/)
*   Widgets
*   Development Guides
*   Making Network Requests

# Making Network Requests

This guide describes how to make basic network requests, test network access, and specify the scope of your widget's network access. As a best practice, Figma recommends that your widget only allows domains that are needed for your widget to work.

In practice, you first develop your widget and implement all the required network requests. Then, before publishing, you can use the instructions in this guide to specify access to only the domains used by your widget.

*   Make network requests
*   Test network access
*   Specify network access

* * *

## Make network requests​

Making network requests with widgets is very similar to making network requests with [plugins](/docs/plugins/making-network-requests/). The widget approach [uses the Plugin API](/docs/widgets/using-the-plugin-api/), and so has the same requirements and limitations as other uses of the Plugin API.

note

This guide assumes that you’re familiar with the basics of creating Figma widgets. If you’re new to developing plugins and widgets, check out the [Build your first plugin](https://help.figma.com/hc/en-us/articles/4407260620823--BYFP-1-Overview) course — you can copy and paste the code from this guide into widgets you build.

The following code sample creates an element that, when clicked, uses the Fetch API to make a request. The response is then rendered in a new text node.

code.tsx

```
const { widget } = figma;const { Text } = widget;// This widget fetches a resource and renders the text response in a rectangle.function Widget() {  return (    <Text      fontSize={24}      onClick={        () =>          (async () => {            const response = await fetch('https://httpbin.org/get?success=true')            const json = await response.json()            const textNode = figma.createText()            // Make sure the new text node is visible where we're currently looking            textNode.x = figma.viewport.center.x            textNode.y = figma.viewport.center.y            await figma.loadFontAsync(textNode.fontName as FontName)            // success=true!            textNode.characters = JSON.stringify(json.args, null, 2)            figma.closePlugin()          })()      }    >      Show fetch response    </Text>  );}widget.register(Widget);
```

Because widgets run inside a browser environment, [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policies apply. Widget iframes have a `null` origin. This means that they will only be able to call APIs with `Access-Control-Allow-Origin: *` (i.e., those that allow access from any origin).

info

Previously, to make network requests within a widget, you had to implement an iframe to handle sending requests and receiving data. While widgets implemented this way will continue to function normally and do not need to be modified, we recommend using the simpler [Fetch API](/docs/plugins/api/properties/global-fetch/) approach. The Fetch API is provided by the Plugin API, which can be used with your widgets.

* * *

## Test network access​

After you've implemented network requests in your widget, whether calls to an API or getting images from a server, test the impact of limiting your widget's network access. Then, use the results of your testing to build the list of domains you need to appropriately limit network access.

To test the impact of limiting your widget's network access:

1.  In your widget's `manifest.json`, add the `networkAccess` key with the `allowedDomains` property set to `["none"]`.
    
    Manifest.json
    
    ```
    {  "name": "MyWidget",  "id": "737805260747778093",  "api": "1.0.0",  "widgetApi": "1.0.0",  "editorType": ["figma", "figjam"],  "containsWidget": true,  "main": "code.js",  "ui": "ui.html",  "networkAccess": {    "allowedDomains": ["none"]  }}
    ```
    
2.  In Figma, try to use your widget as normal. In the developer console, note any content-security policy (CSP) errors. For example, if the request in Make network requests was blocked:
    
    CSP error
    
    ```
    Refused to connect to 'https://httpsbin.org/' because it violates the following Content Security Policy directive: "default-src data:".Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback.
    ```
    
3.  As you identify CSP errors, follow the Limit network access steps to remove `"none"` and add the domains that your widget requires to the `allowedDomains` list.
    

When you're confident that all the required domains are listed in `allowedDomains` and you no longer encounter CSP errors, testing is complete.

* * *

## Specify network access​

To specify a list of domains that your widget is allowed to access, you update the widget's `manifest.json` file:

1.  In your widget's `manifest.json`, add the `networkAccess` key. `networkAccess` has the following properties: `allowedDomains`, `reasoning`, and `devAllowedDomains`.
    
    Manifest.json
    
    ```
    {  "name": "MyWidget",  "id": "737805260747778093",  "api": "1.0.0",  "widgetApi": "1.0.0",  "editorType": ["figma", "figjam"],  "containsWidget": true,  "main": "code.js",  "ui": "ui.html",  "networkAccess": {    "allowedDomains": [],    "reasoning": "",    "devAllowedDomains": []  }}
    ```
    
2.  Add domains to the `allowedDomains` list. The domains that you add to the list should correspond to the domains that you are making requests to. This includes any requests you make for external resources using methods like createImageAsnyc().
    
    For example, to limit a widget's access to only the `httpbin.org` domain used in Make network requests:
    
    Manifest.json
    
    ```
    {  "name": "MyWidget",  "id": "737805260747778093",  "api": "1.0.0",  "widgetApi": "1.0.0",  "editorType": ["figma", "figjam"],  "containsWidget": true,  "main": "code.js",  "ui": "ui.html",  "networkAccess": {    "allowedDomains": ["httpbin.org"],    "reasoning": "",    "devAllowedDomains": []  }}
    ```
    
    If the only endpoint the widget uses is `/get`, make the string in the `allowedDomains` list even more granular:
    
    Manifest.json
    
    ```
    {  "name": "MyWidget",  "id": "737805260747778093",  "api": "1.0.0",  "widgetApi": "1.0.0",  "editorType": ["figma", "figjam"],  "containsWidget": true,  "main": "code.js",  "ui": "ui.html",  "networkAccess": {    "allowedDomains": ["httpbin.org/get"],    "reasoning": "",    "devAllowedDomains": []  }}
    ```
    
    This way, no unexpected requests can be made to other endpoints on the domain.
    
    note
    
    There are several patterns that can be used to specify domains for `allowedDomains`. For a complete list, see [Widget Manifest](/docs/widgets/widget-manifest/). You can also specify:
    
    *   `["none"]`: `none` is a special keyword that prevents all network access. Use this if your widget doesn't make any network requests.
        
    *   `["*"]`: `*` is a special character that permits your widget to access any domain. If your widget includes `*` in `allowedDomains`, then `reasoning` is required.
        
    
3.  For `reasoning`, provide a brief explanation for the access scope permitted by `allowedDomains`. When you publish your widget, this explanation is visible on your widget's Community page along with the list of allowed domains.
    
    For example:
    
    Manifest.json
    
    ```
    {  "name": "MyWidget",  "id": "737805260747778093",  "api": "1.0.0",  "widgetApi": "1.0.0",  "editorType": ["figma", "figjam"],  "containsWidget": true,  "main": "code.js",  "ui": "ui.html",  "networkAccess": {    "allowedDomains": ["httpbin.org/get"],    "reasoning": "MyPlugin queries httpbin.org/get for example responses.",    "devAllowedDomains": []  }}
    ```
    
4.  If you need to access a local or development web server to build your widget, add its domain(s) to the `devAllowedDomains` list. The domains that you add to the list should correspond to the local URL(s) for your development server. If you want to access a local or development web server in `allowedDomains`, then `reasoning` is required.
    
    For example:
    
    Manifest.json
    
    ```
    {  "name": "MyPlugin",  "id": "737805260747778092",  "api": "1.0.0",  "main": "code.js",  "ui": "ui.html",  "networkAccess": {    "allowedDomains": ["httpbin.org/get"],    "reasoning": "MyPlugin queries httpbin.org/get for example responses.",    "devAllowedDomains": ["http://localhost:3000"]  }}
    ```
    
5.  Save the changes to your manifest.
    

After `networkAccess` is implemented, Figma enforces the list of domains that you gave for `allowedDomains`. If a request originates from your widget to a domain not in `allowedDomains`, Figma blocks the request and throws a [content-security policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) error.

For example, if our widget attempts to make a request to `httpbin.org/post`, we get the following error:

CSP error

```
Refused to connect to 'https://httpbin.org/post' because it violates the following Content Security Policy directive: "default-src data:". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback.
```

[

Previous

Handling User Events

](/docs/widgets/handling-user-events/)[

Next

Text Editing

](/docs/widgets/text-editing/)

*   Make network requests
*   Test network access
*   Specify network access

---

# Text Editing | Developer Docs

Source: https://developers.figma.com/docs/widgets/text-editing/

*   [](/)
*   Widgets
*   Development Guides
*   Text Editing

# Text Editing

## `<Input />` component​

To allow users to exit text directly in your widget, use the [`Input`](/docs/widgets/api/component-Input/) component.

The Input component provides an [`onTextEditEnd`](/docs/widgets/api/component-Input/#ontexteditend) callback that fires when the user blurs the Input component.

caution

⚠️ [`onTextEditEnd`](/docs/widgets/api/component-Input/#ontexteditend) does not fire on every key stroke.

The Input component also allows you to specify and style:

*   The text itself
*   A placeholder (via [`placeholderProps`](/docs/widgets/api/component-Input/#placeholderprops))
*   A wrapping frame (via [`inputFrameProps`](/docs/widgets/api/component-Input/#inputframeprops))

## Example​

Typically, you will use a synced variable (eg. [`useSyncedState`](/docs/widgets/api/properties/widget-usesyncedstate/) or [`useSyncedMap`](/docs/widgets/api/properties/widget-usesyncedmap/)) to store text displayed by the Input component which is specified via its [`value`](/docs/widgets/api/component-Input/#value) prop. In the [`onTextEditEnd`](/docs/widgets/api/component-Input/#ontexteditend) callback, you can then update the synced variable accordingly.

Here is an example widget that uses the `Input` component.

![Example input component](https://static.figma.com/uploads/52546777ad3920192e1e9f468f3c66b130ed6891)

Example

```
const { widget } = figmaconst { useSyncedState, AutoLayout, Input } = widgetfunction InputWidget() {  const [text, setText] = useSyncedState("text", "")  return (    <Input      value={text}      placeholder="Type name"      onTextEditEnd={(e) => {        setText(e.characters);      }}      fontSize={64}      fill="#7f1d1d"      width={500}      inputFrameProps={{        fill: "#fee2e2",        stroke: "#b91c1c",        cornerRadius: 16,        padding: 20,      }}      inputBehavior="wrap"    />  )}widget.register(InputWidget)
```

[

Previous

Making Network Requests

](/docs/widgets/making-network-requests/)[

Next

Working with Lists

](/docs/widgets/working-with-lists/)

*    component
*   Example

---

# Working with Lists | Developer Docs

Source: https://developers.figma.com/docs/widgets/working-with-lists/

*   [](/)
*   Widgets
*   Development Guides
*   Working with Lists

# Working with Lists

In some cases, you might want to render a list of values. For example, you might have a list of user photo urls that you want to render.

A common pattern to achieve this in JSX is to use a map as follows:

Rendering a list with map()

```
const { widget } = figmaconst { AutoLayout, Image } = widgetconst userPhotoUrls = [  "https://....",  "https://....",  "https://....",]function ListExample() {  return (    <AutoLayout>      {userPhotoUrls.map(url => {        return <Image key={url} src={url} />      })}    </AutoLayout>  )}widget.register(ListExample);
```

You might notice that we’ve also specified a `key` prop on each image! This works very much in the same way as the [key prop in React](https://reactjs.org/docs/lists-and-keys.html#keys) [](https://reactjs.org/docs/lists-and-keys.html)and it used as a hint to help us identify which items have changed/ been added/removed across re-renders to improve the performance of re-rendering these items!

caution

⚠️ We’ll warn against missing key props in the console whenever we detect lists of children without specified keys. You can fix these warnings by giving each element inside an array a key!

[

Previous

Text Editing

](/docs/widgets/text-editing/)[

Next

Working with Variables

](/docs/widgets/working-with-variables/)

---

# Working with Variables | Developer Docs

Source: https://developers.figma.com/docs/widgets/working-with-variables/

*   [](/)
*   Widgets
*   Development Guides
*   Working with Variables

# Working with Variables

Variables in Figma design store reusable values that can be applied to all kinds of design properties and prototyping actions. They help save time and effort when building designs, managing design systems, and creating complex prototyping flows.

The Variables API is available to widgets by [using the Plugin API](/docs/widgets/using-the-plugin-api/) in your widget.

For more information about using the Variables API, see [Working with Variables](/docs/plugins/working-with-variables/) in the Plugin API documentation.

[

Previous

Working with Lists

](/docs/widgets/working-with-lists/)[

Next

Images in Widgets

](/docs/widgets/images-in-widgets/)

---

# Images in Widgets | Developer Docs

Source: https://developers.figma.com/docs/widgets/images-in-widgets/

*   [](/)
*   Widgets
*   Development Guides
*   Images in Widgets

# Images in Widgets

You can render Images as part of a widget using the `<Image>` component or by using the `fill` property on `<Frame>` and `<Rectangle>` elements.

Here is an example

Render images

```
const { widget } = figmaconst { Image, Frame, AutoLayout } = widgetfunction ImageExamples() {  return (    <AutoLayout>      <Image        // Pass a data uri directly as the image        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAECSURBVHgBpY87TwJBFIXPnVkhbqQQE7UQNWhrsdpLI40FsdSYGGNvbWFhZ2Jj+AWER0fFD6CAhhYCod8GGmCLJRAI2Rl22LDh1RBOc1/fzb0H2EK0WPSfzj+lxG3wMIpAOKpaZfpPpddgKxG510BllSsw6MGAEAYl0zWVMn+L8boEzOXD0oRwrI1vZF9ESRetWO94XMjEDwxb0xttTF6txyNbzbU5mHmWhhtiQ3aGSkQmTH129YJLunJjdQned9DshkbF8d7o4cRiOSB0475ld+JUnTM+/Pb1d0p8ck2eKXN49/OOFfkGOXfCLnjpdamNDfLhgfFdIyE+GOg3AJHHrpoC5YtKfAfixH0AAAAASUVORK5CYII="        width={100}        height={100}      />      <Frame        fill={{          type: 'image',          src: figma.currentUser.photoUrl        }}        width={100}        height={100}      />    </AutoLayout>  )}widget.register(ImageExamples)
```

[

Previous

Working with Variables

](/docs/widgets/working-with-variables/)[

Next

Managing Multiple Widgets

](/docs/widgets/managing-multiple-widgets/)

---

# Managing Multiple Widgets | Developer Docs

Source: https://developers.figma.com/docs/widgets/managing-multiple-widgets/

*   [](/)
*   Widgets
*   Development Guides
*   Managing Multiple Widgets

# Managing Multiple Widgets

So far, we’ve only been talking about single, standalone widgets. For certain use cases, you might want to coordinate across instances of your widget within the same file! We've augmented the [Plugin API](/docs/plugins/) to complement the Widget API seamlessly to with these use cases in mind.

## `WidgetNode.widgetId` and `figma.widgetId`​

Every WidgetNode is associated with its corresponding `manifest.json` "id" field and you can use the Plugin API to read this value to check if a given widget node belongs to your widget.

WidgetNode.widgetId and figma.widgetId

```
const allWidgetNodes: WidgetNode[] = figma.currentPage.findAll(node => {  return node.type === "WIDGET"})const myWidgetNodes: WidgetNode[] = allWidgetNodes.filter(node => {  return node.widgetId === figma.widgetId})
```

## `findWidgetNodesByWidgetId`​

If you want to find all of the widget nodes that match the same `node.widgetId`, you can use [findWidgetNodesByWidgetId](/docs/plugins/api/properties/nodes-findwidgetnodesbywidgetid/).

```
 findWidgetNodesByWidgetId(widgetId: string): Array<WidgetNode>
```

## WidgetNode.widgetSyncedState​

Using the Plugin API, you can read the syncedState of a given widget node via [WidgetNode.widgetSyncedState](/docs/plugins/api/WidgetNode/#widgetsyncedstate).

info

Similar to [pluginData](/docs/plugins/api/DocumentNode/#getplugindata), access to this data is widget specific! The synced state on each widget node will only be visible to widgets that have the same `WidgetNode.widgetId`.

You can then implement a voting widget that caps the maximum number of votes each user can make within in the file. Prior to registering a user’s vote, you can sum up the total number of votes the particular user has made by enumerating through all your widgets in the current file.

Here’s an example snippet of code that does this:

WidgetNode.widgetSyncedState

```
const { widget } = figmaconst { Text, useSyncedMap } = widgetconst MAX_VOTES_ALLOWED = 5function CounterWidget() {  const votes = useSyncedMap<number>("votes")  return (    <Text      onClick={() => {        let numVotes = 0        figma.currentPage.children.forEach(node => {          if (node.type === "WIDGET" && node.widgetId === figma.widgetId) {            numVotes += node.widgetSyncedState[figma.currentUser.id]          }        })        if (numVotes >= MAX_VOTES_ALLOWED) {          figma.notify(`You've already voted ${MAX_VOTES_ALLOWED} times.`)        } else {          votes.set(figma.currentUser.id, 1)        }      }}    >      {votes.size()}    </Text>  )}widget.register(CounterWidget)
```

## WidgetNode.cloneWidget​

Additionally, given a widget node, you can clone it with a custom synced state and synced map values using [WidgetNode.cloneWidget](/docs/plugins/api/WidgetNode/#clonewidget).

WidgetNode.cloneWidget

```
interface WidgetNode {  cloneWidget(    syncedStateOverrides: { [name: string]: any },    syncedMapOverrides?: { [mapName: string]: { [key: string]: any } }  ): WidgetNode}
```

caution

NOTE: every key in `syncedMapOverrides` will override the entire corresponding synced map, deleting all existing keys in the map. If you wish to preserve some of the keys in the map, you'll need to explicitly specify them in the override.

Similar to `WidgetNode.widgetSyncedState`, the is only supported for widgets that share the same `WidgetNode.widgetId`! Only you can call this function on your widget nodes.

When used in combination with the `useWidgetId` hook, this lets you create rich, multi-widget experiences like an Org Chart, where each Org Chart Item is its own widget.

Similar to [`WidgetNode.clone`](/docs/plugins/api/WidgetNode/#clone), the duplicate will be parented under `figma.currentPage`. If you are relying on the x, y or the relativeTransform of the original widget, make sure to account for the case where the original widget is parented under a different node (eg. a section).

## WidgetNode.setWidgetSyncedState​

Not only can you clone a widget with a new synced state and synced map values, you can also set the state on an existing widget matching the same `node.widgetId` using [setWidgetSyncedState](/docs/plugins/api/WidgetNode/#setwidgetsyncedstate). This can be helpful managing multi-widget experiences where the user is able to update other widgets by taking an action on a single widget.

```
  interface WidgetNode {    setWidgetSyncedState(      syncedState: { [name: string]: any },      syncedMap?: { [mapName: string]: { [key: string]: any } },    ): void  }
```

[

Previous

Images in Widgets

](/docs/widgets/images-in-widgets/)[

Next

Adding Hover States

](/docs/widgets/adding-hover-states/)

*   WidgetNode.widgetId and figma.widgetId
*   findWidgetNodesByWidgetId
*   WidgetNode.widgetSyncedState
*   WidgetNode.cloneWidget
*   WidgetNode.setWidgetSyncedState

---

# Adding Hover States | Developer Docs

Source: https://developers.figma.com/docs/widgets/adding-hover-states/

*   [](/)
*   Widgets
*   Development Guides
*   Adding Hover States

# Adding Hover States

## Overview​

Any component can take an optional **`hoverStyle`** property that takes on property overrides. These overrides will be applied when a user hovers over a parent **hover target**.

The **`hoverStyle`** prop accepts the type of **[`HoverStyle`](/docs/widgets/api/type-HoverStyle/)** and the only properties that can be overridden by it are:

*   `fill`
*   `stroke`
*   `opacity`

A valid **hover target** is currently defined as any component that has an `onClick` or `onTextEditEnd` event handler on it.

When hovering over a **hover target** the hoverStyle of the target and all of its children recursively are applied, unless they are in a **hover target** that isn't currently hovered.

## Example​

In the below example hovering over the button will make the containing `AutoLayout` black and the nested `Text` inside of it white.

Adding hover styles to a button

```
const { widget } = figmaconst { useSyncedState, AutoLayout, Text } = widgetfunction Widget() {  const [count, setCount] = useSyncedState('count', 0)  return (    <AutoLayout      verticalAlignItems={'center'}      spacing={8}      padding={16}      cornerRadius={8}      fill={'#FFFFFF'}      stroke={'#E6E6E6'}      onClick={() => setCount(count + 1)}      hoverStyle={{        fill: '#000000',      }}    >      <Text        fill="#000000"        hoverStyle={{          fill: '#FFFFFF',        }}      >        Count: {String(count)}      </Text>    </AutoLayout>  )}widget.register(Widget)
```

Here is a gif of it in action: ![Hover button](/assets/images/hover-button-6a47ce07f8c6983d93533c757fe3842d.gif)

[

Previous

Managing Multiple Widgets

](/docs/widgets/managing-multiple-widgets/)[

Next

Undo/Redo for Widgets

](/docs/widgets/undo-redo/)

*   Overview
*   Example

---

# Undo/Redo for Widgets | Developer Docs

Source: https://developers.figma.com/docs/widgets/undo-redo/

*   [](/)
*   Widgets
*   Development Guides
*   Undo/Redo for Widgets

# Undo/Redo for Widgets

Undo/Redo works differently for widgets compared to regular FigJam/Figma objects because ultimately, a widget is simply a rendered version of its synced state. When a user performs an undo/redo action, the widget's state is updated accordingly and the widget re-renders to reflect the new state.

## How this works​

Each user has their own undo / redo stack, which will keep track of changes to [`useSyncedState`](/docs/widgets/api/properties/widget-usesyncedstate/) and [`useSyncedMap`](/docs/widgets/api/properties/widget-usesyncedmap/) variables. You can think of these synced variables as stored in one big mapping.

For example, if your widget uses the following hooks:

Undo / redo widget example

```
const { widget } = figmaconst { AutoLayout, useSyncedState, useSyncedMap } = widgetfunction UndoWidget() {  const [count, setCount] = useSyncedState("count", 0)  const [countMap] = useSyncedMap("countMap")  return (    <AutoLayout      onClick={() => {        countMap.set("userA", 1)        countMap.set("userB", 2)      }}    >      {String(count)}    </AutoLayout>  )}figma.widget.register(UndoWidget)
```

This mapping can be visualized as follows (after the user clicks on the widget):

Synced state mapping

```
{  "count": 0,  "countMap-userA": 1,  "countMap-userB": 2}
```

When a user interacts with a widget that causes a change to a synced variable, we determine what changed and instead of that, push the inverse of the change onto the stack. If the user then takes an "undo" action, we pop the values from the stack, apply the changes to the existing mapping, and re-render the widget.

## Counter Widget Example​

### A basic counter with 1 user​

Let’s say the counter widget is implemented with single [`useSyncedState`](/docs/widgets/api/properties/widget-usesyncedstate/) hook:

caution

⚠️ In practice, counters should be implemented using [`useSyncedMap`](/docs/widgets/api/properties/widget-usesyncedmap/) for correctness.

Basic counter

```
const { widget } = figmaconst { Text, useSyncedState } = widgetfunction BasicCounter() {  const [count, setCount] = useSyncedState("count", 0)  return (    <Text onClick={() => setCount(count + 1)}>      {String(count)}    </Text>  )}figma.widget.register(BasicCounter)
```

The following table describes a series of actions and the resulting widget state, widget display, and each user’s undo/redo stack. To keep things simple, we will just look at undo, but redo works exactly the same way.

Action

Widget State

User A undo stack

Display

Initial

`{ count: 0 }`

`[]`

0

User A increments

`{ count: 1 }`

`[{count: 0}]`

1

User A increments

`{ count: 2 }`

`[{count: 1}, {count: 0}]`

2

User A undoes

`{ count: 1 }`

`[{count: 0}]`

1

User A undoes

`{ count: 0 }`

`[]`

0

caution

⚠️ These actions and results are straightforward and consistent with expectations. **However, when we add another user this BasicCounter will no longer work as expected.**

### A basic counter with 2 users​

Let’s see what happens when two users interact with the widget.

Action

Widget State

User A undo stack

User B undo stack

Display

Initial

`{ count: 0 }`

`[]`

`[]`

0

User A increments

`{ count: 1 }`

`[{count: 0}]`

`[]`

1

User B increments

`{ count: 2 }`

`[{count: 0}]`

`[{count: 1}]`

2

User A undoes

`{ count: 0 }`

`[]`

`[{count: 1}]`

0

User B undoes

`{ count: 1 }`

`[]`

`[]`

1

**When User A performs an "undo" action, the count goes from 2 → 0, which is problematic.** This happens because when User A incremented the counter (from 0 to 1), the inverse of their action sets the counter to 0. To the observer, though, it looks like User A has somehow undone User B’s action. Similarly, when User B undoes, the count gets reset back to 1.

### Counter with `useSyncedMap`​

The expected behavior for when each user performs an undo action is for the counter to only remove their vote. We can achieve this by tracking of each user’s individual counts separately in a `SyncedMap` and displaying the sum of all counts.

Here is the same widget re-implemented:

Good counter

```
const { widget } = figmaconst { Text, useSyncedMap } = widgetfunction GoodCounter() {  const countMap = useSyncedMap("countMap")  let totalCount = 0  for (let val of countMap.values()){    totalCount += val  }  return (    <Text      onClick={() => {        const sessionId = figma.currentUser.sessionId.toString()        const val = countMap.get(sessionId) || 0        countMap.set(sessionId, val + 1)      }}    >      {String(totalCount)}    </Text>  )}figma.widget.register(GoodCounter)
```

Action

Widget State

User A undo

User B undo

Display

Initial

`{ }`

`[]`

`[]`

0

User A increments

`{countMap-A: 1}`

`[{countMap-A: null}]`

`[]`

1

User B increments

`{countMap-A: 1, count-B: 1}`

`[{countMap-A: null}]`

`[{countMap-B: null}]`

2

User A undoes

`{countMap-B: 1}`

`[]`

`[{countMap-B: null}]`

1

User B undoes

`{ }`

`[]`

`[]`

0

info

_Note that_ **`{count-A: null}`** _simply means this value was just added and that we should remove that key if this is applied to the synced state in an undo._

Here, we can see that each user's undo interacts well with the existing count. Both users simply "undo" their respective increments when they undo.

## When to [`useSyncedMap`](/docs/widgets/api/properties/widget-usesyncedmap/) vs [`useSyncedState`](/docs/widgets/api/properties/widget-usesyncedstate/)​

When you want to preserve user specific objects/values, it is important to [`useSyncedMap`](/docs/widgets/api/properties/widget-usesyncedmap/), so that values from multiple users get applied properly in multiplayer scenarios. For more information, read [Widget State and Multiplayer.](/docs/widgets/widget-state-and-multiplayer/)

Of course, there are times that [`useSyncedState`](/docs/widgets/api/properties/widget-usesyncedstate/) is appropriate. For example, let’s say you are storing the “theme” of your widget in a synced state. If User A changes this value from “gray” to “red”, then User B changes the value from “red” to “blue”. When User A undoes, the value will go back to “gray”.

## Undoing Plugin API methods in a Widget​

Let’s say your widget also utilizes the plugin API to perform other actions. To register a set of actions as part of the undo/redo stack, you can use [`figma.commitUndo()`](/docs/plugins/api/properties/figma-commitundo/).

[

Previous

Adding Hover States

](/docs/widgets/adding-hover-states/)[

Next

Best Practices

](/docs/widgets/best-practices/)

*   How this works
*   Counter Widget Example
    *   A basic counter with 1 user
    *   A basic counter with 2 users
    *   Counter with useSyncedMap
*   When to useSyncedMap vs useSyncedState
*   Undoing Plugin API methods in a Widget

---

# Best Practices | Developer Docs

Source: https://developers.figma.com/docs/widgets/best-practices/

*   [](/)
*   Widgets
*   Development Guides
*   Best Practices

# Best Practices

## Performance​

In order to build widgets that are fast for most users and scenarios, it's helpful to understand the things that could make them slow.

The following things are particularly expensive for FigJam to render, so they have the potential to slow down your widget if used excessively, in particular for users on lower-powered computers. Please use them sparingly:

*   **Blurs and shadows**: If you want to keep the look of these effects, you can rasterize them as images and then render the images in your widget. However, rasterization is a lossy process, meaning some vector data will be lost during the conversion.
*   **Blend modes**: Any blend mode that is not `normal` or `passthrough` can be slow. Our renderer is heavily optimized for `normal` and `passthrough` blend modes.
*   **Complex SVG**: These are expensive to render because we have to parse each SVG and create its individual layers.
*   **Load additional pages only as needed**: If a widget does not contain the manifest field `"documentAccess": "dynamic-page"`, the entire document will be loaded when a widget is interacted with. In large or complex files, loading the entire document the first time your widget runs can sometimes cause a delay of 20 to 30 seconds. If your widget needs to access other pages in the document, only [load the pages the user needs](/docs/plugins/accessing-document/), rather than the whole document.

## Design​

Because widgets are effectively interactive applications, how you think about both the visual and UX design of your widget is really important. Keep the following best practices in mind when designing your widgets:

*   **Keep as much interaction on the canvas as possible:** the magic of widgets is in their on-canvas, multiplayer interactions, so you should try to keep all user actions on the canvas and reserve the property menu for settings or property changes.
*   **Avoid making the entire widget clickable:** Widgets with large clickable areas can be difficult to select without accidentally triggering a click handler. Try to reserve some empty space that is not clickable, especially if the widget has a property menu which requires selection to show.
*   **Position your iframe relative to your widget’s position:** If you are using an iframe to show settings on a widget, use the `position` property to show the iframe closer to your widget so it is easier to reach and doesn’t cover up the widget.

## Using the [Property menu](/docs/widgets/api/properties/widget-usepropertymenu/)​

*   **Keep the property menu simple:** too many options will not only clutter the UI, but will also overwhelm users. If your widget requires a lot of complex settings, think about putting them in an iframe instead of the property menu.
*   **Do not repeat actions you can take on the widget in the property menu:** Showing the same actions on the widget and its property menu can be confusing to users. Make sure your widget’s actions are mutually exclusive to either surface.
*   **Use icons + tooltips in the property menu whenever possible:** All FigJam native objects use icons with tooltips in their property menus. Try using icons as much as possible and only fall back to text buttons when the actions are difficult to convey with icons.
*   **40x40 icons look best in the property menu:** keep these dimensions in mind!

[

Previous

Undo/Redo for Widgets

](/docs/widgets/undo-redo/)[

Next

Testing

](/docs/widgets/testing/)

*   Performance
*   Design
*   Using the Property menu

---

# Testing | Developer Docs

Source: https://developers.figma.com/docs/widgets/testing/

*   [](/)
*   Widgets
*   Development Guides
*   Testing

# Testing

Once you have the initial design and logic for your widget, you’ll want to stress test it across various scenarios to make sure it works properly. This includes not only focusing on the core use cases of your widget, but also considering situations that you didn't expect.

Here are some helpful things to keep in mind as you test & debug your widget:

*   What are the core use cases of your widget? Make sure to test those extensively.
*   What are ways users might incorrectly use your widget? Test those too.
*   Have you loaded all the data your widget needs?
    *   Do you need to [access pages](/docs/plugins/accessing-document/#loading-pages-and-nodes) other than the user's current page?
*   If your widget is only meant to do something if certain [type of nodes](/docs/plugins/api/nodes/) are selected, what happens when:
    *   The user has nothing selected?
    *   The wrong type of node is selected?
    *   Multiple things are selected?
    *   A component is selected? Are you alright with the change propagating to potentially hundreds of instances?
*   If your widget modifies a text layer, what happens [if the font for that text layer is missing?](/docs/plugins/working-with-text/#missing-fonts)
*   If your widget can edit a [component](/docs/plugins/api/ComponentNode/), what happens if the component comes from the team library?
*   If your widget executes long-running tasks, note that the user can unexpected stop your widget by:
    *   Deleting your widget
    *   Interacting with another widget
    *   Leaving the file
    *   Losing internet connection/going offline
*   If your widget stays open for a while:
    *   What happens if the user [deletes a node](/docs/plugins/api/properties/nodes-removed/) you currently have a reference to?
    *   What happens a multiplayer event causes changes in the document?
*   If your widget is concerned with the position of layers, what happens if something is rotated?
*   If your widget can traverse large parts of the document (e.g. search for a node), what happens if the document is [very large](/docs/plugins/frozen-plugins/)**?**
    *   Can you [load pages only as needed](/docs/widgets/how-widgets-run/#file-loading) instead of loading the whole document?
*   If you're using a bundler, have you checked the output size of your widget? Could you make it smaller (e.g. by running your bundler in release mode)?
*   Widgets are highly collaborative — make sure to test your widget with multiple people. If you can’t do that, open a file that contains your widget in two windows of the Figma Desktop app.
*   Keep in mind that [FigJam for iPad](https://www.figma.com/figjam/ipad/) is available. Is your widget usable on a smaller screen like an iPad?

Read more about our [widget review guidelines](https://help.figma.com/hc/en-us/articles/360039958914).

[

Previous

Best Practices

](/docs/widgets/best-practices/)[

Next

Stability and Updates

](/docs/widgets/stability-and-updates/)

---

# Samples | Developer Docs

Source: https://developers.figma.com/docs/widgets/samples/

*   [](/)
*   Widgets
*   Other
*   Samples

# Samples

Redirecting...

[

Previous

Stability and Updates

](/docs/widgets/stability-and-updates/)[

Next

What's Supported

](/docs/widgets/whats-supported/)

---

# What's Supported | Developer Docs

Source: https://developers.figma.com/docs/widgets/whats-supported/

*   [](/)
*   Widgets
*   Other
*   What's Supported

# What's Supported

We’re actively listening to and prioritizing feedback so this list may change. Currently here is what we plan to support in the API in the short & medium term.

## Currently Supported​

*   ✅ Defining what a widget looks like
*   ✅ Setting widget state via `useSyncedState` and `useSyncedMap`
*   ✅ `onClick` events on widgets
*   ✅ `<Input />` component for text editing
*   ✅ Adding hover states to nodes in a widget via the `hoverStyle` prop
*   ✅ Text, icon, and selector property menu buttons
*   ✅ Using the Plugin API inside event handlers and `usePropertyMenu`
*   ✅ Opening iframes and making network requests
*   ✅ useEffect Hook
*   ✅ Keep-Alive API to allow for long running useEffect callbacks
*   ✅ Cursor changes when hovering over clickable areas of the widget
*   ✅ Cloning widgets with custom state
*   ✅ Widgets sticking to other objects via `useStickable`
*   ✅ Widgets running code when stamps and other stickables are stuck to them via `useStickableHost`
*   ✅ Widget publishing

## Future Extensions​

*   🗄️ More inline menu button types (eg. Toggles)
*   🗄️ Local states for widgets

## Unlikely​

*   ❌ Nesting component instances inside widgets
*   ❌ Nesting stickies, shapes, or connectors inside widgets

[

Previous

Samples

](/docs/widgets/samples/)[

Next

Get Help

](/docs/widgets/get-help/)

*   Currently Supported
*   Future Extensions
*   Unlikely

---

# Get Help | Developer Docs

Source: https://developers.figma.com/docs/widgets/get-help/

*   [](/)
*   Widgets
*   Other
*   Get Help

# Get Help

To ask questions about how to use the API, and get resources and help from fellow widget/plugin developers, [join our community-driven Discord server](https://discord.gg/xzQhe2Vcvx).

If you have a feature request or bug reports, use our [support form](https://help.figma.com/hc/en-us/requests/new).

Issues with widgets plugins should be sent directly to their respective authors using the contact information provided on that widgets's page.

### How to get your issue resolved faster​

When you run into an issue, you will get a better & faster answer if you provide more information!

## Include the error message​

❌ Bad example: "Clicking on the widget doesn't run my code. What can I do?"

✅ Good example: "Clicking on the widget doesn't run my code, but I got an error message 'Cannot use useSyncedState hook outside of widget rendering'. I don't understand this error -- what does it mean for a widget to be rendering?"

## Show the code that didn't do what you expected​

❌ Bad example: "Is using GradientPaint fills with widgets broken? I can't see anything after creating one."

✅ Good example: "I'm having difficulties getting gradient fill paints to work. I expected the following to show a linear gradient fill on my rectangle but I see nothing:

Good example

```
<Rectangle  fill={{    type: "gradient-linear",    gradientHandlePositions: [{ x: 0, y: 0}, { x: 0, y: 0}, { x: 0, y: 0}],    gradientStops: [      { position: 0, color: { r: 0, g: 0, b: 0, a: 1 }},      { position: 1, color: { r: 1, g: 1, b: 1, a: 1 }}    ]  }}/>
```

Am I doing something wrong?"

## Provide code and a series of reproducible steps​

❌ Bad example: "This error seems to come from internal Figma code, can you fix it?"

✅ Good example: "When I use figma.someAPI, I get an error which I suspect is a bug. Here is the code that I am currently running \[attached zip\]. To reproduce, open a file containing an image, select the image, run the plugin, and click on the "analyze" button."

[

Previous

What's Supported

](/docs/widgets/whats-supported/)

*   How to get your issue resolved faster
*   Include the error message
*   Show the code that didn't do what you expected
*   Provide code and a series of reproducible steps

---

# The Typings File | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/typings/

*   [](/)
*   Widgets
*   Overview
*   The Typings File

# The Typings File

Here’s a sample tsconfig.json to get you started. Widgets created from the default templates will already have this included:

```
{   "compilerOptions": {      "jsx": "react",      "jsxFactory": "figma.widget.h",      "jsxFragmentFactory": "figma.widget.Fragment",      "target": "es6",      "strict": true,      "typeRoots": [         "./node_modules/@types",         "./node_modules/@figma"      ]   }}
```

You’ll also need to install widget and plugins typings from npm

```
npm install --save-dev @figma/widget-typings @figma/plugin-typings
```

[

Previous

Widget Manifest

](/docs/widgets/widget-manifest/)[

Next

figma.widget

](/docs/widgets/api/figma-widget/)

---

# figma.widget | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/figma-widget/

*   [](/)
*   Widgets
*   Global Objects
*   figma.widget

# figma.widget

### figma.widget

### [register](/docs/widgets/api/properties/widget-register/)(component: FunctionalWidget<any>): void

Used to register your widget. **This is the main entry point to widgets.**

This function expects a widget function that describes the widget and returns a Figma element (eg. one of the components AutoLayout, Frame, Text etc).

[View more →](/docs/widgets/api/properties/widget-register/)

* * *

### [useWidgetId](/docs/widgets/api/properties/widget-usewidgetid/)(): string

The `useWidgetId` hook gives you a way to reference the active widget node in event handlers like `onClick`. It returns a node `id` which can be used to retrieve and identify the active WidgetNode via the plugin API (eg. `figma.getNodeById`).

[View more →](/docs/widgets/api/properties/widget-usewidgetid/)

* * *

### [useSyncedState](/docs/widgets/api/properties/widget-usesyncedstate/)<T>(name: string, defaultValue: T | (() => T)): \[T, (newValue: T | ((currValue: T) => T)) => void\]

The `useSyncedState` hook lets you declare that your widget relies on some state. You give `useSyncedState` a storage key and a default value and it returns the current value stored and a function to update the value.

[View more →](/docs/widgets/api/properties/widget-usesyncedstate/)

* * *

### [useSyncedMap](/docs/widgets/api/properties/widget-usesyncedmap/)<T>(name: string): [SyncedMap](/docs/widgets/api/type-SyncedMap/#synced-map)<T>

The `useSyncedMap` hook works similarly to `useSyncedState`, but each value within the map is updated last-writer-wins, instead of the entire map being overwritten last-writer-wins.

[View more →](/docs/widgets/api/properties/widget-usesyncedmap/)

* * *

### [usePropertyMenu](/docs/widgets/api/properties/widget-usepropertymenu/)(items: [WidgetPropertyMenuItem](/docs/widgets/api/type-PropertyMenu/#widget-property-menu-item)\[\], onChange: (event: [WidgetPropertyEvent](/docs/widgets/api/type-PropertyMenu/#widget-property-event)) => void | Promise<void>): void

The `usePropertyMenu` hook lets you specify the property menu to show when the widget is selected (See image below).

[View more →](/docs/widgets/api/properties/widget-usepropertymenu/)

* * *

### [useEffect](/docs/widgets/api/properties/widget-useeffect/)(effect: () => (() => void) | void): void

The `useEffect` hook can be useful for running code that should run anytime the state of a widget changes or a widget is interacted with. You can use it to do data fetching when a component mounts (by using it with `waitForTask` ) or keeping state in sync between an iframe and the widget.

[View more →](/docs/widgets/api/properties/widget-useeffect/)

* * *

### [useStickable](/docs/widgets/api/properties/widget-usestickable/)(onStuckStatusChanged?: (e: [WidgetStuckEvent](/docs/widgets/api/type-WidgetStuckEvent/#widget-stuck-event)) => void | Promise<void>): void

info

This API is only available in FigJam

`useStickable` is a hook that makes your widget stick to other nodes when dragged over them. This behavior is similar to how stamp nodes work in Figma.

[View more →](/docs/widgets/api/properties/widget-usestickable/)

* * *

### [useStickableHost](/docs/widgets/api/properties/widget-usestickablehost/)(onAttachmentsChanged?: (e: [WidgetAttachedStickablesChangedEvent](/docs/widgets/api/type-WidgetAttachedStickablesChangedEvent/#widget-attached-stickables-changed-event)) => void | Promise<void>): void

info

This API is only available in FigJam

`useStickableHost` lets your widget run a callback when a stickable is added or removed to your widget. By default all widgets are already stickable hosts so you don't have to call this if you just want stamps to stick to your widget.

[View more →](/docs/widgets/api/properties/widget-usestickablehost/)

* * *

### [waitForTask](/docs/widgets/api/properties/widget-waitfortask/)(task: Promise<any>): void

The `waitForTask` function is useful for doing asynchronous work (eg. data fetching) in `useEffect`. It takes a promise and keeps the widget alive until the promise is resolved (or if there’s an explicit call to `figma.closePlugin`).

[View more →](/docs/widgets/api/properties/widget-waitfortask/)

* * *

### [colorMapToOptions](/docs/widgets/api/properties/widget-colormaptooptions/)(colorPalette: { \[key: string\]: string }): WidgetPropertyMenuColorSelectorOption\[\]

info

This API is only available in FigJam

The `colorMapToOptions` takes in a [ColorPalette](/docs/plugins/api/ColorPalette/), a map from color names to values, and returns `WidgetPropertyMenuColorSelectorOption[]`. This helper function enables developers to use `figma.constants.colors.*`, official FigJam color palettes, in the `PropertyMenu`.

[View more →](/docs/widgets/api/properties/widget-colormaptooptions/)

* * *

[

Previous

The Typings File

](/docs/widgets/api/typings/)[

Next

register

](/docs/widgets/api/properties/widget-register/)

---

# <AutoLayout /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-AutoLayout/

*   [](/)
*   Widgets
*   Component Types
*   AutoLayout

# <AutoLayout />

`AutoLayout` is a frame with auto layout automatically applied. It therefore takes in some additional auto layout specific props, which are `direction` , `horizontalAlignItems` , `verticalAlignItems`, `spacing` and `padding`.

This means that children of an AutoLayout component will not be positioned by `x` and `y` constraints, but can have a width or height of `fill-parent`.

## `BaseProps`​

### name?: string

The name of the component. This is useful to specify a data-layer attribute to make things more debuggable when you inspect the sublayers of your widget.

* * *

### hidden?: boolean

Toggles whether to show the component.

* * *

### onClick?: (event: [WidgetClickEvent](/docs/widgets/api/type-WidgetClickEvent/#widget-click-event)) => Promise<any> | void

Attach a click handler on the given node. If the given function is async or returns a promise, the widget is only terminated when the async function has completed and the promise has been resolved. The click handler is also passed a [`WidgetClickEvent`](/docs/widgets/api/type-WidgetClickEvent/) object that contains additional information about the click.

See also: [Handling User Events](/docs/widgets/handling-user-events/).

* * *

### key?: string | number

The key of the component.

* * *

### hoverStyle?: [HoverStyle](/docs/widgets/api/type-HoverStyle/#hover-style)

The style to be applied when the mouse is hovering over the component.

* * *

### tooltip?: string

The tooltip that is shown to the user when hovering over the component.

* * *

### positioning?: 'auto' | 'absolute'

This value is ignored unless the node is a direct child of an AutoLayout frame.

value

description

'auto'

Layout this node according to auto-layout rules.

'absolute'

Take this node out of the auto-layout flow, while still nesting it inside the auto-layout frame. This allows explicitly setting `x`, `y`, `width`, and `height`.

* * *

### `BlendProps`​

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

The blendMode of the component.

* * *

### opacity?: number

The opacity of the component.

* * *

### effect?: [Effect](/docs/widgets/api/type-Effect/#effect) | [Effect](/docs/widgets/api/type-Effect/#effect)\[\]

The effect of the component.

* * *

### `ConstraintProps`​

### x?: number | [HorizontalConstraint](/docs/widgets/api/type-Constraint/#horizontal-constraint)

The x position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### y?: number | [VerticalConstraint](/docs/widgets/api/type-Constraint/#vertical-constraint)

The y position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### overflow?: Overflow

The overflow of the component - 'visible' | 'hidden' | 'scroll'

Specify `hidden` to clip the contents of the frame. `visible` and `scroll` both behave the same way and will allow the contents of the frame to overflow.

* * *

## `SizeProps`​

### width?: [AutolayoutSize](/docs/widgets/api/type-Size/#autolayout-size)

The width of the component.

* * *

### height?: [AutolayoutSize](/docs/widgets/api/type-Size/#autolayout-size)

The height of the component.

* * *

### minWidth?: number

The minWidth of this component. Only affects AutoLayout and its children.

* * *

### maxWidth?: number

The maxWidth of this component. Only affects AutoLayout and its children.

* * *

### minHeight?: number

The minHeight of this component. Only affects AutoLayout and its children.

* * *

### maxHeight?: number

The maxHeight of this component. Only affects AutoLayout and its children.

* * *

## `LayoutProps`​

### spacing?: number | 'auto' | [LayoutGap](/docs/widgets/api/type-LayoutGap/#layout-gap)

Determines distance between children of this AutoLayout frame. A single number value or 'auto' controls both horizontal and vertical gap.

"auto" spacing is the same as `justify-content: space-between` in css.

* * *

### padding?: [Padding](/docs/widgets/api/type-Padding/#padding)

Determines the padding between the border of the AutoLayout frame and its children.

* * *

### direction?: 'horizontal' | 'vertical'

Determines the auto-layout direction of this frame

* * *

### horizontalAlignItems?: Omit<[AlignItems](/docs/widgets/api/type-AlignItems/#align-items), 'baseline'>

Determines how the children in this AutoLayout frame should be aligned in the horizontal direction.

* * *

### verticalAlignItems?: [AlignItems](/docs/widgets/api/type-AlignItems/#align-items)

Determines how the children in this AutoLayout frame should be aligned in the vertical direction.

* * *

### wrap?: boolean

Determines whether children that overflow the bounds of this frame will wrap to a new line. Only applicable when `direction` is set to `"horizontal"`.

* * *

### rotation?: number

The rotation of the node in degrees. Expects values from -180 to 180.

The rotation is with respect to the top-left of the object. Therefore, it is independent from the position of the object.

* * *

## `CornerProps`​

### cornerRadius?: [CornerRadius](/docs/widgets/api/type-CornerRadius/#corner-radius)

The number of pixels to round the corners of the object by.

This value must be non-negative and can be fractional. If an edge length is less than twice the corner radius, the corner radius for each vertex of the edge will be clamped to half the edge length.

info

Rectangle nodes can also have different corner radii on each of the four corners.

* * *

## `GeometryProps`​

### fill?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [Paint](/docs/widgets/api/type-Paint/#paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node

* * *

### stroke?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node's stroke.

* * *

### strokeWidth?: number

The thickness of the stroke, in pixels. This value must be non-negative and can be fractional.

* * *

### strokeAlign?: [StrokeAlign](/docs/widgets/api/type-StrokeAlign/#stroke-align)

The alignment of the stroke with respect to the boundaries of the node.

Center-aligned stroke means the center of the stroke falls exactly on the geometry. Inside-aligned stroke shifts the stroke so it lies completely inside the shape, and outside-aligned stroke is vice versa.

info

Inside and outside stroke are actually implemented by doubling the stroke weight and masking the stroke by the fill. This means inside-aligned stroke will never draw strokes outside the fill and outside-aligned stroke will never draw strokes inside the fill.

* * *

### strokeDashPattern?: number\[\]

The alternating stroke dash and gap lengths, in pixels. An empty array gives a solid stroke and a single value will be applied to both the dash and gap length.

* * *

## Default Props​

Prop

Defaults

`name`

`""`

`hidden`

`false`

`x`

`0`

`y`

`0`

`blendMode`

`"pass-through"`

`opacity`

`1`

`effect`

`[]`

`fill`

`[]`

`stroke`

`[]`

`strokeWidth`

`1`

`strokeAlign`

`"inside"`

`rotation`

`0`

`cornerRadius`

`0`

`overflow`

`"hidden"`

`width`

`"hug-contents"`

`height`

"hug-contents"\`

`direction`

`"horizontal"`

`wrap`

`false`

`spacing`

`0`

`padding`

`0`

`horizontalAlignItems`

`"start"`

`verticalAlignItems`

`"start"`

[

Previous

colorMapToOptions

](/docs/widgets/api/properties/widget-colormaptooptions/)[

Next

Frame

](/docs/widgets/api/component-Frame/)

*   BaseProps
    *   BlendProps
    *   ConstraintProps
*   SizeProps
*   LayoutProps
*   CornerProps
*   GeometryProps
*   Default Props

---

# AlignItems | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-AlignItems/

*   [](/)
*   Widgets
*   Data Types
*   AlignItems

# AlignItems

Determines how the AutoLayout frame’s children should be aligned in primary/counter axis direction.

```
type AlignItems = 'center' | 'start' | 'end' | 'baseline'
```

## Remarks​

*   `"start"` and `"end"` correspond to:
    *   left and right respectively for AutoLayout frames with "horizontal" direction.
    *   top and bottom respectively for AutoLayout frames with "vertical" direction.
*   `"baseline"` can only be set on horizontal AutoLayout frames, and aligns all children along the text baseline.

[

Previous

Fragment

](/docs/widgets/api/component-Fragment/)[

Next

ArcData

](/docs/widgets/api/type-ArcData/)

*   Remarks

---

# <Frame /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-Frame/

*   [](/)
*   Widgets
*   Component Types
*   Frame

# <Frame />

`Frame` acts exactly like a non-autolayout Frame within Figma, where children are positioned using x and y constraints. This component is useful to define a layout hierarchy.

> If you want to use autolayout, use [`AutoLayout`](/docs/widgets/api/component-AutoLayout/) instead.

## `BaseProps`​

### name?: string

The name of the component. This is useful to specify a data-layer attribute to make things more debuggable when you inspect the sublayers of your widget.

* * *

### hidden?: boolean

Toggles whether to show the component.

* * *

### onClick?: (event: [WidgetClickEvent](/docs/widgets/api/type-WidgetClickEvent/#widget-click-event)) => Promise<any> | void

Attach a click handler on the given node. If the given function is async or returns a promise, the widget is only terminated when the async function has completed and the promise has been resolved. The click handler is also passed a [`WidgetClickEvent`](/docs/widgets/api/type-WidgetClickEvent/) object that contains additional information about the click.

See also: [Handling User Events](/docs/widgets/handling-user-events/).

* * *

### key?: string | number

The key of the component.

* * *

### hoverStyle?: [HoverStyle](/docs/widgets/api/type-HoverStyle/#hover-style)

The style to be applied when the mouse is hovering over the component.

* * *

### tooltip?: string

The tooltip that is shown to the user when hovering over the component.

* * *

### positioning?: 'auto' | 'absolute'

This value is ignored unless the node is a direct child of an AutoLayout frame.

value

description

'auto'

Layout this node according to auto-layout rules.

'absolute'

Take this node out of the auto-layout flow, while still nesting it inside the auto-layout frame. This allows explicitly setting `x`, `y`, `width`, and `height`.

* * *

### `BlendProps`​

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

The blendMode of the component.

* * *

### opacity?: number

The opacity of the component.

* * *

### effect?: [Effect](/docs/widgets/api/type-Effect/#effect) | [Effect](/docs/widgets/api/type-Effect/#effect)\[\]

The effect of the component.

* * *

### `ConstraintProps`​

### x?: number | [HorizontalConstraint](/docs/widgets/api/type-Constraint/#horizontal-constraint)

The x position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### y?: number | [VerticalConstraint](/docs/widgets/api/type-Constraint/#vertical-constraint)

The y position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### overflow?: Overflow

The overflow of the component - 'visible' | 'hidden' | 'scroll'

Specify `hidden` to clip the contents of the frame. `visible` and `scroll` both behave the same way and will allow the contents of the frame to overflow.

* * *

## `SizeProps` (Required)​

### width: [Size](/docs/widgets/api/type-Size/#size)

The width of the component. This is required.

* * *

### height: [Size](/docs/widgets/api/type-Size/#size)

The height of the component. This is required.

* * *

### minWidth?: number

The minWidth of this component. Only affects AutoLayout and its children.

* * *

### maxWidth?: number

The maxWidth of this component. Only affects AutoLayout and its children.

* * *

### minHeight?: number

The minHeight of this component. Only affects AutoLayout and its children.

* * *

### maxHeight?: number

The maxHeight of this component. Only affects AutoLayout and its children.

* * *

### rotation?: number

The rotation of the node in degrees. Expects values from -180 to 180.

The rotation is with respect to the top-left of the object. Therefore, it is independent from the position of the object.

* * *

## `CornerProps`​

### cornerRadius?: [CornerRadius](/docs/widgets/api/type-CornerRadius/#corner-radius)

The number of pixels to round the corners of the object by.

This value must be non-negative and can be fractional. If an edge length is less than twice the corner radius, the corner radius for each vertex of the edge will be clamped to half the edge length.

info

Rectangle nodes can also have different corner radii on each of the four corners.

* * *

## `GeometryProps`​

### fill?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [Paint](/docs/widgets/api/type-Paint/#paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node

* * *

### stroke?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node's stroke.

* * *

### strokeWidth?: number

The thickness of the stroke, in pixels. This value must be non-negative and can be fractional.

* * *

### strokeAlign?: [StrokeAlign](/docs/widgets/api/type-StrokeAlign/#stroke-align)

The alignment of the stroke with respect to the boundaries of the node.

Center-aligned stroke means the center of the stroke falls exactly on the geometry. Inside-aligned stroke shifts the stroke so it lies completely inside the shape, and outside-aligned stroke is vice versa.

info

Inside and outside stroke are actually implemented by doubling the stroke weight and masking the stroke by the fill. This means inside-aligned stroke will never draw strokes outside the fill and outside-aligned stroke will never draw strokes inside the fill.

* * *

### strokeDashPattern?: number\[\]

The alternating stroke dash and gap lengths, in pixels. An empty array gives a solid stroke and a single value will be applied to both the dash and gap length.

* * *

## Default Props​

Prop

Defaults

`name`

`""`

`hidden`

`false`

`x`

`0`

`y`

`0`

`blendMode`

`"pass-through"`

`opacity`

`1`

`effect`

`[]`

`fill`

`[]`

`stroke`

`[]`

`strokeWidth`

`1`

`strokeAlign`

`"inside"`

`rotation`

`0`

`cornerRadius`

`0`

`overflow`

`"hidden"`

[

Previous

AutoLayout

](/docs/widgets/api/component-AutoLayout/)[

Next

Text

](/docs/widgets/api/component-Text/)

*   BaseProps
    *   BlendProps
    *   ConstraintProps
*   SizeProps (Required)
*   CornerProps
*   GeometryProps
*   Default Props

---

# <Text /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-Text/

*   [](/)
*   Widgets
*   Component Types
*   Text

# <Text />

`Text` components support the vast majority of properties that can be applied to text in Figma and is the primary way to include text in your widget!

## Usage Example​

Usage example

```
<Text fontFamily="Inter" fontSize={20}>  Hello Widget</Text>
```

## Text Style Props​

### href?: string

If specified, turns the text node into a link that navigates to the specified `href` on click.

* * *

### fontFamily?: string

The font family (e.g. "Inter"). The supported fonts are all the fonts in the [Google Fonts](https://fonts.google.com/) library.

* * *

### letterSpacing?: number | string

The spacing between the individual characters.

* * *

### textDecoration?: 'none' | 'strikethrough' | 'underline'

Whether the text is underlined or has a strikethrough.

* * *

### fontSize?: number

The size of the font. Has minimum value of 1.

* * *

### italic?: boolean

Whether or not to italicize the text content.

* * *

### textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced'

Overrides the case of the raw characters in the text node.

* * *

### fontWeight?: [FontWeight](/docs/widgets/api/type-FontWeight/#font-weight)

The font weight eg. 400, 500 or 'medium', 'bold'.

* * *

### fill?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [Paint](/docs/widgets/api/type-Paint/#paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill in the text.

* * *

### paragraphIndent?: number

The indentation of paragraphs (offset of the first line from the left).

* * *

### paragraphSpacing?: number

The vertical distance between paragraphs.

* * *

### horizontalAlignText?: 'left' | 'right' | 'center' | 'justified'

The horizontal alignment of the text with respect to the Text node.

* * *

### verticalAlignText?: 'top' | 'center' | 'bottom'

The vertical alignment of the text with respect to the Text node.

* * *

### lineHeight?: number | string | 'auto'

The spacing between the lines in a paragraph of text.

* * *

### truncate?: boolean | number

Whether the text should truncate if it overflows the size of the node. Set to a number to truncate after a specific number of lines.

* * *

### stroke?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node's stroke.

* * *

### strokeWidth?: number

The thickness of the stroke, in pixels. This value must be non-negative and can be fractional.

* * *

### strokeAlign?: [StrokeAlign](/docs/widgets/api/type-StrokeAlign/#stroke-align)

The alignment of the stroke with respect to the boundaries of the node.

Center-aligned stroke means the center of the stroke falls exactly on the geometry. Inside-aligned stroke shifts the stroke so it lies completely inside the shape, and outside-aligned stroke is vice versa.

info

Inside and outside stroke are actually implemented by doubling the stroke weight and masking the stroke by the fill. This means inside-aligned stroke will never draw strokes outside the fill and outside-aligned stroke will never draw strokes inside the fill.

* * *

## `SizeProps`​

### width?: [AutolayoutSize](/docs/widgets/api/type-Size/#autolayout-size)

The width of the component.

* * *

### height?: [AutolayoutSize](/docs/widgets/api/type-Size/#autolayout-size)

The height of the component.

* * *

### minWidth?: number

The minWidth of this component. Only affects AutoLayout and its children.

* * *

### maxWidth?: number

The maxWidth of this component. Only affects AutoLayout and its children.

* * *

### minHeight?: number

The minHeight of this component. Only affects AutoLayout and its children.

* * *

### maxHeight?: number

The maxHeight of this component. Only affects AutoLayout and its children.

* * *

### rotation?: number

The rotation of the node in degrees. Expects values from -180 to 180.

The rotation is with respect to the top-left of the object. Therefore, it is independent from the position of the object.

* * *

## `BaseProps`​

### name?: string

The name of the component. This is useful to specify a data-layer attribute to make things more debuggable when you inspect the sublayers of your widget.

* * *

### hidden?: boolean

Toggles whether to show the component.

* * *

### onClick?: (event: [WidgetClickEvent](/docs/widgets/api/type-WidgetClickEvent/#widget-click-event)) => Promise<any> | void

Attach a click handler on the given node. If the given function is async or returns a promise, the widget is only terminated when the async function has completed and the promise has been resolved. The click handler is also passed a [`WidgetClickEvent`](/docs/widgets/api/type-WidgetClickEvent/) object that contains additional information about the click.

See also: [Handling User Events](/docs/widgets/handling-user-events/).

* * *

### key?: string | number

The key of the component.

* * *

### hoverStyle?: [HoverStyle](/docs/widgets/api/type-HoverStyle/#hover-style)

The style to be applied when the mouse is hovering over the component.

* * *

### tooltip?: string

The tooltip that is shown to the user when hovering over the component.

* * *

### positioning?: 'auto' | 'absolute'

This value is ignored unless the node is a direct child of an AutoLayout frame.

value

description

'auto'

Layout this node according to auto-layout rules.

'absolute'

Take this node out of the auto-layout flow, while still nesting it inside the auto-layout frame. This allows explicitly setting `x`, `y`, `width`, and `height`.

* * *

### `BlendProps`​

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

The blendMode of the component.

* * *

### opacity?: number

The opacity of the component.

* * *

### effect?: [Effect](/docs/widgets/api/type-Effect/#effect) | [Effect](/docs/widgets/api/type-Effect/#effect)\[\]

The effect of the component.

* * *

### `ConstraintProps`​

### x?: number | [HorizontalConstraint](/docs/widgets/api/type-Constraint/#horizontal-constraint)

The x position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### y?: number | [VerticalConstraint](/docs/widgets/api/type-Constraint/#vertical-constraint)

The y position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

## Default Props​

Prop

Defaults

`name`

`""`

`hidden`

`false`

`x`

`0`

`y`

`0`

`blendMode`

`"pass-through"`

`opacity`

`1`

`effect`

`[]`

`width`

`"hug-contents"`

`height`

`"hug-contents"`

`rotation`

`0`

`fontFamily`

`"Inter"`

`horizontalAlignText`

`"left"`

`verticalAlignText`

`"top"`

`leadingTrim`

`"auto"`

`letterSpacing`

`0`

`lineHeight`

`"auto"`

`textDecoration`

`"none"`

`textCase`

`"original"`

`fontSize`

`16`

`italic`

`false`

`fill`

`"#000000"`

`blendMode`

`"normal"`

`fontWeight`

`400`

`paragraphIndent`

`0`

`paragraphSpacing`

`0`

`listSpacing`

`0`

`hangingPunctuation`

`false`

`hangingList`

`false`

`truncate`

`false`

[

Previous

Frame

](/docs/widgets/api/component-Frame/)[

Next

Span

](/docs/widgets/api/component-Span/)

*   Usage Example
*   Text Style Props
*   SizeProps
*   BaseProps
    *   BlendProps
    *   ConstraintProps
*   Default Props

---

# <Rectangle /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-Rectangle/

*   [](/)
*   Widgets
*   Component Types
*   Rectangle

# <Rectangle />

A `Rectangle` is essentially a frame without children or auto layout props.

## `SizeProps` (Required)​

### width: [Size](/docs/widgets/api/type-Size/#size)

The width of the component. This is required.

* * *

### height: [Size](/docs/widgets/api/type-Size/#size)

The height of the component. This is required.

* * *

### minWidth?: number

The minWidth of this component. Only affects AutoLayout and its children.

* * *

### maxWidth?: number

The maxWidth of this component. Only affects AutoLayout and its children.

* * *

### minHeight?: number

The minHeight of this component. Only affects AutoLayout and its children.

* * *

### maxHeight?: number

The maxHeight of this component. Only affects AutoLayout and its children.

* * *

### rotation?: number

The rotation of the node in degrees. Expects values from -180 to 180.

The rotation is with respect to the top-left of the object. Therefore, it is independent from the position of the object.

* * *

## `CornerProps`​

### cornerRadius?: [CornerRadius](/docs/widgets/api/type-CornerRadius/#corner-radius)

The number of pixels to round the corners of the object by.

This value must be non-negative and can be fractional. If an edge length is less than twice the corner radius, the corner radius for each vertex of the edge will be clamped to half the edge length.

info

Rectangle nodes can also have different corner radii on each of the four corners.

* * *

## `GeometryProps`​

### fill?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [Paint](/docs/widgets/api/type-Paint/#paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node

* * *

### stroke?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node's stroke.

* * *

### strokeWidth?: number

The thickness of the stroke, in pixels. This value must be non-negative and can be fractional.

* * *

### strokeAlign?: [StrokeAlign](/docs/widgets/api/type-StrokeAlign/#stroke-align)

The alignment of the stroke with respect to the boundaries of the node.

Center-aligned stroke means the center of the stroke falls exactly on the geometry. Inside-aligned stroke shifts the stroke so it lies completely inside the shape, and outside-aligned stroke is vice versa.

info

Inside and outside stroke are actually implemented by doubling the stroke weight and masking the stroke by the fill. This means inside-aligned stroke will never draw strokes outside the fill and outside-aligned stroke will never draw strokes inside the fill.

* * *

### strokeDashPattern?: number\[\]

The alternating stroke dash and gap lengths, in pixels. An empty array gives a solid stroke and a single value will be applied to both the dash and gap length.

* * *

## `BaseProps`​

### name?: string

The name of the component. This is useful to specify a data-layer attribute to make things more debuggable when you inspect the sublayers of your widget.

* * *

### hidden?: boolean

Toggles whether to show the component.

* * *

### onClick?: (event: [WidgetClickEvent](/docs/widgets/api/type-WidgetClickEvent/#widget-click-event)) => Promise<any> | void

Attach a click handler on the given node. If the given function is async or returns a promise, the widget is only terminated when the async function has completed and the promise has been resolved. The click handler is also passed a [`WidgetClickEvent`](/docs/widgets/api/type-WidgetClickEvent/) object that contains additional information about the click.

See also: [Handling User Events](/docs/widgets/handling-user-events/).

* * *

### key?: string | number

The key of the component.

* * *

### hoverStyle?: [HoverStyle](/docs/widgets/api/type-HoverStyle/#hover-style)

The style to be applied when the mouse is hovering over the component.

* * *

### tooltip?: string

The tooltip that is shown to the user when hovering over the component.

* * *

### positioning?: 'auto' | 'absolute'

This value is ignored unless the node is a direct child of an AutoLayout frame.

value

description

'auto'

Layout this node according to auto-layout rules.

'absolute'

Take this node out of the auto-layout flow, while still nesting it inside the auto-layout frame. This allows explicitly setting `x`, `y`, `width`, and `height`.

* * *

### `BlendProps`​

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

The blendMode of the component.

* * *

### opacity?: number

The opacity of the component.

* * *

### effect?: [Effect](/docs/widgets/api/type-Effect/#effect) | [Effect](/docs/widgets/api/type-Effect/#effect)\[\]

The effect of the component.

* * *

### `ConstraintProps`​

### x?: number | [HorizontalConstraint](/docs/widgets/api/type-Constraint/#horizontal-constraint)

The x position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### y?: number | [VerticalConstraint](/docs/widgets/api/type-Constraint/#vertical-constraint)

The y position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

## Default Props​

Prop

Default

`name`

`""`

`hidden`

`false`

`x`

`0`

`y`

`0`

`blendMode`

`"pass-through"`

`opacity`

`1`

`effect`

`[]`

`fill`

`[]`

`stroke`

`[]`

`strokeWidth`

`1`

`strokeAlign`

`"inside"`

`rotation`

`0`

`cornerRadius`

`0`

[

Previous

Input

](/docs/widgets/api/component-Input/)[

Next

Image

](/docs/widgets/api/component-Image/)

*   SizeProps (Required)
*   CornerProps
*   GeometryProps
*   BaseProps
    *   BlendProps
    *   ConstraintProps
*   Default Props

---

# <Image /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-Image/

*   [](/)
*   Widgets
*   Component Types
*   Image

# <Image />

An `Image` is essentially syntactic sugar for a [`Rectangle`](/docs/widgets/api/component-Rectangle/) with an image fill. Instead of the fill prop, it has a `src` prop, that can be either a URL string or an ImagePaint. If a URL string is passed that will be used to create an ImagePaint.

## Usage Example​

Usage example

```
<Image  // Pass a data uri directly as the image  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAECSURBVHgBpY87TwJBFIXPnVkhbqQQE7UQNWhrsdpLI40FsdSYGGNvbWFhZ2Jj+AWER0fFD6CAhhYCod8GGmCLJRAI2Rl22LDh1RBOc1/fzb0H2EK0WPSfzj+lxG3wMIpAOKpaZfpPpddgKxG510BllSsw6MGAEAYl0zWVMn+L8boEzOXD0oRwrI1vZF9ESRetWO94XMjEDwxb0xttTF6txyNbzbU5mHmWhhtiQ3aGSkQmTH129YJLunJjdQned9DshkbF8d7o4cRiOSB0475ld+JUnTM+/Pb1d0p8ck2eKXN49/OOFfkGOXfCLnjpdamNDfLhgfFdIyE+GOg3AJHHrpoC5YtKfAfixH0AAAAASUVORK5CYII="  width={100}  height={100}/>
```

### src: string | [ImagePaint](/docs/widgets/api/type-ImagePaint/#image-paint)

A string representing Image URL/DataURI or an ImagePaint.

* * *

## `SizeProps` (Required)​

### width: [Size](/docs/widgets/api/type-Size/#size)

The width of the component. This is required.

* * *

### height: [Size](/docs/widgets/api/type-Size/#size)

The height of the component. This is required.

* * *

### minWidth?: number

The minWidth of this component. Only affects AutoLayout and its children.

* * *

### maxWidth?: number

The maxWidth of this component. Only affects AutoLayout and its children.

* * *

### minHeight?: number

The minHeight of this component. Only affects AutoLayout and its children.

* * *

### maxHeight?: number

The maxHeight of this component. Only affects AutoLayout and its children.

* * *

### rotation?: number

The rotation of the node in degrees. Expects values from -180 to 180.

The rotation is with respect to the top-left of the object. Therefore, it is independent from the position of the object.

* * *

## `CornerProps`​

### cornerRadius?: [CornerRadius](/docs/widgets/api/type-CornerRadius/#corner-radius)

The number of pixels to round the corners of the object by.

This value must be non-negative and can be fractional. If an edge length is less than twice the corner radius, the corner radius for each vertex of the edge will be clamped to half the edge length.

info

Rectangle nodes can also have different corner radii on each of the four corners.

* * *

## `GeometryProps`​

### fill?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [Paint](/docs/widgets/api/type-Paint/#paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node

* * *

### stroke?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node's stroke.

* * *

### strokeWidth?: number

The thickness of the stroke, in pixels. This value must be non-negative and can be fractional.

* * *

### strokeAlign?: [StrokeAlign](/docs/widgets/api/type-StrokeAlign/#stroke-align)

The alignment of the stroke with respect to the boundaries of the node.

Center-aligned stroke means the center of the stroke falls exactly on the geometry. Inside-aligned stroke shifts the stroke so it lies completely inside the shape, and outside-aligned stroke is vice versa.

info

Inside and outside stroke are actually implemented by doubling the stroke weight and masking the stroke by the fill. This means inside-aligned stroke will never draw strokes outside the fill and outside-aligned stroke will never draw strokes inside the fill.

* * *

### strokeDashPattern?: number\[\]

The alternating stroke dash and gap lengths, in pixels. An empty array gives a solid stroke and a single value will be applied to both the dash and gap length.

* * *

## `BaseProps`​

### name?: string

The name of the component. This is useful to specify a data-layer attribute to make things more debuggable when you inspect the sublayers of your widget.

* * *

### hidden?: boolean

Toggles whether to show the component.

* * *

### onClick?: (event: [WidgetClickEvent](/docs/widgets/api/type-WidgetClickEvent/#widget-click-event)) => Promise<any> | void

Attach a click handler on the given node. If the given function is async or returns a promise, the widget is only terminated when the async function has completed and the promise has been resolved. The click handler is also passed a [`WidgetClickEvent`](/docs/widgets/api/type-WidgetClickEvent/) object that contains additional information about the click.

See also: [Handling User Events](/docs/widgets/handling-user-events/).

* * *

### key?: string | number

The key of the component.

* * *

### hoverStyle?: [HoverStyle](/docs/widgets/api/type-HoverStyle/#hover-style)

The style to be applied when the mouse is hovering over the component.

* * *

### tooltip?: string

The tooltip that is shown to the user when hovering over the component.

* * *

### positioning?: 'auto' | 'absolute'

This value is ignored unless the node is a direct child of an AutoLayout frame.

value

description

'auto'

Layout this node according to auto-layout rules.

'absolute'

Take this node out of the auto-layout flow, while still nesting it inside the auto-layout frame. This allows explicitly setting `x`, `y`, `width`, and `height`.

* * *

### `BlendProps`​

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

The blendMode of the component.

* * *

### opacity?: number

The opacity of the component.

* * *

### effect?: [Effect](/docs/widgets/api/type-Effect/#effect) | [Effect](/docs/widgets/api/type-Effect/#effect)\[\]

The effect of the component.

* * *

### `ConstraintProps`​

### x?: number | [HorizontalConstraint](/docs/widgets/api/type-Constraint/#horizontal-constraint)

The x position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### y?: number | [VerticalConstraint](/docs/widgets/api/type-Constraint/#vertical-constraint)

The y position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

## Default Props​

Prop

Default

`name`

`""`

`hidden`

`false`

`x`

`0`

`y`

`0`

`blendMode`

`"pass-through"`

`opacity`

`1`

`effect`

`[]`

`stroke`

`[]`

`strokeWidth`

`1`

`strokeAlign`

`"inside"`

`rotation`

`0`

`cornerRadius`

`0`

[

Previous

Rectangle

](/docs/widgets/api/component-Rectangle/)[

Next

Ellipse

](/docs/widgets/api/component-Ellipse/)

*   Usage Example
*   SizeProps (Required)
*   CornerProps
*   GeometryProps
*   BaseProps
    *   BlendProps
    *   ConstraintProps
*   Default Props

---

# <Ellipse /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-Ellipse/

*   [](/)
*   Widgets
*   Component Types
*   Ellipse

# <Ellipse />

`Ellipse` is useful for creating ellipses and circles.

### arcData?: [ArcData](/docs/widgets/api/type-ArcData/#arc-data)

The "arc" properties of the Ellipse.

* * *

## `BaseProps`​

### name?: string

The name of the component. This is useful to specify a data-layer attribute to make things more debuggable when you inspect the sublayers of your widget.

* * *

### hidden?: boolean

Toggles whether to show the component.

* * *

### onClick?: (event: [WidgetClickEvent](/docs/widgets/api/type-WidgetClickEvent/#widget-click-event)) => Promise<any> | void

Attach a click handler on the given node. If the given function is async or returns a promise, the widget is only terminated when the async function has completed and the promise has been resolved. The click handler is also passed a [`WidgetClickEvent`](/docs/widgets/api/type-WidgetClickEvent/) object that contains additional information about the click.

See also: [Handling User Events](/docs/widgets/handling-user-events/).

* * *

### key?: string | number

The key of the component.

* * *

### hoverStyle?: [HoverStyle](/docs/widgets/api/type-HoverStyle/#hover-style)

The style to be applied when the mouse is hovering over the component.

* * *

### tooltip?: string

The tooltip that is shown to the user when hovering over the component.

* * *

### positioning?: 'auto' | 'absolute'

This value is ignored unless the node is a direct child of an AutoLayout frame.

value

description

'auto'

Layout this node according to auto-layout rules.

'absolute'

Take this node out of the auto-layout flow, while still nesting it inside the auto-layout frame. This allows explicitly setting `x`, `y`, `width`, and `height`.

* * *

### `BlendProps`​

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

The blendMode of the component.

* * *

### opacity?: number

The opacity of the component.

* * *

### effect?: [Effect](/docs/widgets/api/type-Effect/#effect) | [Effect](/docs/widgets/api/type-Effect/#effect)\[\]

The effect of the component.

* * *

### `ConstraintProps`​

### x?: number | [HorizontalConstraint](/docs/widgets/api/type-Constraint/#horizontal-constraint)

The x position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### y?: number | [VerticalConstraint](/docs/widgets/api/type-Constraint/#vertical-constraint)

The y position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

## `SizeProps`​

### width?: [Size](/docs/widgets/api/type-Size/#size)

The width of the component.

* * *

### height?: [Size](/docs/widgets/api/type-Size/#size)

The height of the component.

* * *

### minWidth?: number

The minWidth of this component. Only affects AutoLayout and its children.

* * *

### maxWidth?: number

The maxWidth of this component. Only affects AutoLayout and its children.

* * *

### minHeight?: number

The minHeight of this component. Only affects AutoLayout and its children.

* * *

### maxHeight?: number

The maxHeight of this component. Only affects AutoLayout and its children.

* * *

### rotation?: number

The rotation of the node in degrees. Expects values from -180 to 180.

The rotation is with respect to the top-left of the object. Therefore, it is independent from the position of the object.

* * *

## `GeometryProps`​

### fill?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [Paint](/docs/widgets/api/type-Paint/#paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node

* * *

### stroke?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node's stroke.

* * *

### strokeWidth?: number

The thickness of the stroke, in pixels. This value must be non-negative and can be fractional.

* * *

### strokeAlign?: [StrokeAlign](/docs/widgets/api/type-StrokeAlign/#stroke-align)

The alignment of the stroke with respect to the boundaries of the node.

Center-aligned stroke means the center of the stroke falls exactly on the geometry. Inside-aligned stroke shifts the stroke so it lies completely inside the shape, and outside-aligned stroke is vice versa.

info

Inside and outside stroke are actually implemented by doubling the stroke weight and masking the stroke by the fill. This means inside-aligned stroke will never draw strokes outside the fill and outside-aligned stroke will never draw strokes inside the fill.

* * *

### strokeDashPattern?: number\[\]

The alternating stroke dash and gap lengths, in pixels. An empty array gives a solid stroke and a single value will be applied to both the dash and gap length.

* * *

## Default Props​

Prop

Default

`name`

`""`

`hidden`

`false`

`x`

`0`

`y`

`0`

`blendMode`

`"pass-through"`

`opacity`

`1`

`effect`

`[]`

`fill`

`[]`

`stroke`

`[]`

`strokeWidth`

`1`

`strokeAlign`

`"inside"`

`rotation`

`0`

[

Previous

Image

](/docs/widgets/api/component-Image/)[

Next

SVG

](/docs/widgets/api/component-SVG/)

*   BaseProps
    *   BlendProps
    *   ConstraintProps
*   SizeProps
*   GeometryProps
*   Default Props

---

# <SVG /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-SVG/

*   [](/)
*   Widgets
*   Component Types
*   SVG

# <SVG />

The `SVG` component is useful for rendering an SVG directly inside your widget.

## Usage Example​

Usage example

```
<SVG  // Using the svg component you can embed an svg right into the widget  src={buttonSvgSrc}  onClick={() => setCount(count + 1) }/>const buttonSvgSrc = `  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">    <circle cx="16" cy="16" r="15.5" stroke="black" stroke-opacity="0.1"/>    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 8H15V15H8V17H15V24H17V17H24V15H17V8Z" fill="black" fill-opacity="0.8"/>  </svg>`;
```

## `SvgProps`​

### src: string

A svg string of the form `<svg .... />`

* * *

## `SizeProps`​

### width?: [Size](/docs/widgets/api/type-Size/#size)

The width of the component.

* * *

### height?: [Size](/docs/widgets/api/type-Size/#size)

The height of the component.

* * *

### minWidth?: number

The minWidth of this component. Only affects AutoLayout and its children.

* * *

### maxWidth?: number

The maxWidth of this component. Only affects AutoLayout and its children.

* * *

### minHeight?: number

The minHeight of this component. Only affects AutoLayout and its children.

* * *

### maxHeight?: number

The maxHeight of this component. Only affects AutoLayout and its children.

* * *

### rotation?: number

The rotation of the node in degrees. Expects values from -180 to 180.

The rotation is with respect to the top-left of the object. Therefore, it is independent from the position of the object.

* * *

## `GeometryProps`​

### fill?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [Paint](/docs/widgets/api/type-Paint/#paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node

* * *

### stroke?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node's stroke.

* * *

### strokeWidth?: number

The thickness of the stroke, in pixels. This value must be non-negative and can be fractional.

* * *

### strokeAlign?: [StrokeAlign](/docs/widgets/api/type-StrokeAlign/#stroke-align)

The alignment of the stroke with respect to the boundaries of the node.

Center-aligned stroke means the center of the stroke falls exactly on the geometry. Inside-aligned stroke shifts the stroke so it lies completely inside the shape, and outside-aligned stroke is vice versa.

info

Inside and outside stroke are actually implemented by doubling the stroke weight and masking the stroke by the fill. This means inside-aligned stroke will never draw strokes outside the fill and outside-aligned stroke will never draw strokes inside the fill.

* * *

### strokeDashPattern?: number\[\]

The alternating stroke dash and gap lengths, in pixels. An empty array gives a solid stroke and a single value will be applied to both the dash and gap length.

* * *

## `BaseProps`​

### name?: string

The name of the component. This is useful to specify a data-layer attribute to make things more debuggable when you inspect the sublayers of your widget.

* * *

### hidden?: boolean

Toggles whether to show the component.

* * *

### onClick?: (event: [WidgetClickEvent](/docs/widgets/api/type-WidgetClickEvent/#widget-click-event)) => Promise<any> | void

Attach a click handler on the given node. If the given function is async or returns a promise, the widget is only terminated when the async function has completed and the promise has been resolved. The click handler is also passed a [`WidgetClickEvent`](/docs/widgets/api/type-WidgetClickEvent/) object that contains additional information about the click.

See also: [Handling User Events](/docs/widgets/handling-user-events/).

* * *

### key?: string | number

The key of the component.

* * *

### hoverStyle?: [HoverStyle](/docs/widgets/api/type-HoverStyle/#hover-style)

The style to be applied when the mouse is hovering over the component.

* * *

### tooltip?: string

The tooltip that is shown to the user when hovering over the component.

* * *

### positioning?: 'auto' | 'absolute'

This value is ignored unless the node is a direct child of an AutoLayout frame.

value

description

'auto'

Layout this node according to auto-layout rules.

'absolute'

Take this node out of the auto-layout flow, while still nesting it inside the auto-layout frame. This allows explicitly setting `x`, `y`, `width`, and `height`.

* * *

### `BlendProps`​

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

The blendMode of the component.

* * *

### opacity?: number

The opacity of the component.

* * *

### effect?: [Effect](/docs/widgets/api/type-Effect/#effect) | [Effect](/docs/widgets/api/type-Effect/#effect)\[\]

The effect of the component.

* * *

### `ConstraintProps`​

### x?: number | [HorizontalConstraint](/docs/widgets/api/type-Constraint/#horizontal-constraint)

The x position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### y?: number | [VerticalConstraint](/docs/widgets/api/type-Constraint/#vertical-constraint)

The y position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

[

Previous

Ellipse

](/docs/widgets/api/component-Ellipse/)[

Next

Line

](/docs/widgets/api/component-Line/)

*   Usage Example
*   SvgProps
*   SizeProps
*   GeometryProps
*   BaseProps
    *   BlendProps
    *   ConstraintProps

---

# <Line /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-Line/

*   [](/)
*   Widgets
*   Component Types
*   Line

# <Line />

A basic line component.

### length?: [Size](/docs/widgets/api/type-Size/#size)

The length of the line.

* * *

### strokeCap?: [StrokeCap](/docs/widgets/api/type-StrokeCap/#stroke-cap)

The decoration applied to the line endpoints.

* * *

### stroke?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node's stroke.

* * *

### strokeWidth?: number

The thickness of the stroke, in pixels. This value must be non-negative and can be fractional.

* * *

### rotation?: number

The rotation of the node in degrees. Expects values from -180 to 180.

The rotation is with respect to the top-left of the object. Therefore, it is independent from the position of the object.

* * *

## `BaseProps`​

### name?: string

The name of the component. This is useful to specify a data-layer attribute to make things more debuggable when you inspect the sublayers of your widget.

* * *

### hidden?: boolean

Toggles whether to show the component.

* * *

### onClick?: (event: [WidgetClickEvent](/docs/widgets/api/type-WidgetClickEvent/#widget-click-event)) => Promise<any> | void

Attach a click handler on the given node. If the given function is async or returns a promise, the widget is only terminated when the async function has completed and the promise has been resolved. The click handler is also passed a [`WidgetClickEvent`](/docs/widgets/api/type-WidgetClickEvent/) object that contains additional information about the click.

See also: [Handling User Events](/docs/widgets/handling-user-events/).

* * *

### key?: string | number

The key of the component.

* * *

### hoverStyle?: [HoverStyle](/docs/widgets/api/type-HoverStyle/#hover-style)

The style to be applied when the mouse is hovering over the component.

* * *

### tooltip?: string

The tooltip that is shown to the user when hovering over the component.

* * *

### positioning?: 'auto' | 'absolute'

This value is ignored unless the node is a direct child of an AutoLayout frame.

value

description

'auto'

Layout this node according to auto-layout rules.

'absolute'

Take this node out of the auto-layout flow, while still nesting it inside the auto-layout frame. This allows explicitly setting `x`, `y`, `width`, and `height`.

* * *

### `BlendProps`​

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

The blendMode of the component.

* * *

### opacity?: number

The opacity of the component.

* * *

### effect?: [Effect](/docs/widgets/api/type-Effect/#effect) | [Effect](/docs/widgets/api/type-Effect/#effect)\[\]

The effect of the component.

* * *

### `ConstraintProps`​

### x?: number | [HorizontalConstraint](/docs/widgets/api/type-Constraint/#horizontal-constraint)

The x position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### y?: number | [VerticalConstraint](/docs/widgets/api/type-Constraint/#vertical-constraint)

The y position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

## Default Props​

Prop

Default

`name`

`""`

`hidden`

`false`

`stroke`

`#000000`

`strokeWidth`

`1`

`length`

`100`

`x`

`0`

`y`

`0`

`blendMode`

`"pass-through"`

`opacity`

`1`

`fill`

`[]`

`effect`

`[]`

[

Previous

SVG

](/docs/widgets/api/component-SVG/)[

Next

Fragment

](/docs/widgets/api/component-Fragment/)

*   BaseProps
    *   BlendProps
    *   ConstraintProps
*   Default Props

---

# <Input /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-Input/

*   [](/)
*   Widgets
*   Component Types
*   Input

# <Input />

`Input` components support editing text directly inside the widget.

For usage examples, see the [Text Editing](/docs/widgets/text-editing/) guide.

## InputProps​

### onTextEditEnd: (event: [TextEditEvent](/docs/widgets/api/type-TextEditEvent/#text-edit-event)) => void

A method that is called when a user exits text edit mode (similar to [`onBlur`](https://reactjs.org/docs/events.html#onblur) in React).

The `event` is an object containing the characters in the editable text field. i.e. `{ characters: "someText" }`

The `onTextEditEnd` event can always be triggered via clicking out of the element, hitting `Escape`, or `Cmd + Enter`. See inputBehavior for other ways to trigger `onTextEditEnd` and blur the input.

* * *

### value: string | null

The value of the editable text. Typically, this value will be a synced variable that will be set in the `onTextEditEnd` callback.

* * *

### placeholder?: string

Placeholder text that shows whenever `value` is `null` or an empty string.

* * *

### placeholderProps?: [PlaceholderProps](/docs/widgets/api/type-PlaceholderProps/#placeholder-props)

Props to customize the text placeholder. Use this prop if you want the placeholder to render differently compared to the editable text.

All relevant props on the Input component will automatically be are applied to both the editable text and the placeholder. Any additional props specified here will then be applied only to the placeholder.

* * *

### inputFrameProps?: Omit<[AutoLayoutProps](/docs/widgets/api/component-AutoLayout/#auto-layout-props), 'width'>

Props to customize the Autolayout frame that parents the editable text and placeholder.

* * *

### width?: [Size](/docs/widgets/api/type-Size/#size)

The width of the editable text. The text will wrap around if the user types beyond the width. Defaults to `200`.

* * *

### inputBehavior?: 'wrap' | 'truncate' | 'multiline'

Allows you to specify some interactions and resizing behavior of the Input component.

value

description

`"wrap"` (default)

Typing `Enter` blurs the input and triggers `onTextEditEnd`. On overflow, the text will wrap to the next line and the height of the input will autoresize.

`"truncate"`

Typing `Enter` blurs the input and triggers `onTextEditEnd`. On overflow, the text will truncate.

`"multiline"`

Typing `Enter` will create a new line. On overflow, the text will wrap to the next line and the height of the input will resize automatically.

* * *

## Text Style Props​

### href?: string

If specified, turns the text node into a link that navigates to the specified `href` on click.

* * *

### fontFamily?: string

The font family (e.g. "Inter"). The supported fonts are all the fonts in the [Google Fonts](https://fonts.google.com/) library.

* * *

### letterSpacing?: number | string

The spacing between the individual characters.

* * *

### textDecoration?: 'none' | 'strikethrough' | 'underline'

Whether the text is underlined or has a strikethrough.

* * *

### fontSize?: number

The size of the font. Has minimum value of 1.

* * *

### italic?: boolean

Whether or not to italicize the text content.

* * *

### textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced'

Overrides the case of the raw characters in the text node.

* * *

### fontWeight?: [FontWeight](/docs/widgets/api/type-FontWeight/#font-weight)

The font weight eg. 400, 500 or 'medium', 'bold'.

* * *

### fill?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [Paint](/docs/widgets/api/type-Paint/#paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill in the text.

* * *

### paragraphIndent?: number

The indentation of paragraphs (offset of the first line from the left).

* * *

### paragraphSpacing?: number

The vertical distance between paragraphs.

* * *

### horizontalAlignText?: 'left' | 'right' | 'center' | 'justified'

The horizontal alignment of the text with respect to the Text node.

* * *

### verticalAlignText?: 'top' | 'center' | 'bottom'

The vertical alignment of the text with respect to the Text node.

* * *

### lineHeight?: number | string | 'auto'

The spacing between the lines in a paragraph of text.

* * *

### truncate?: boolean | number

Whether the text should truncate if it overflows the size of the node. Set to a number to truncate after a specific number of lines.

* * *

### stroke?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill the area of the node's stroke.

* * *

### strokeWidth?: number

The thickness of the stroke, in pixels. This value must be non-negative and can be fractional.

* * *

### strokeAlign?: [StrokeAlign](/docs/widgets/api/type-StrokeAlign/#stroke-align)

The alignment of the stroke with respect to the boundaries of the node.

Center-aligned stroke means the center of the stroke falls exactly on the geometry. Inside-aligned stroke shifts the stroke so it lies completely inside the shape, and outside-aligned stroke is vice versa.

info

Inside and outside stroke are actually implemented by doubling the stroke weight and masking the stroke by the fill. This means inside-aligned stroke will never draw strokes outside the fill and outside-aligned stroke will never draw strokes inside the fill.

* * *

### rotation?: number

The rotation of the node in degrees. Expects values from -180 to 180.

The rotation is with respect to the top-left of the object. Therefore, it is independent from the position of the object.

* * *

## `BaseProps`​

### name?: string

The name of the component. This is useful to specify a data-layer attribute to make things more debuggable when you inspect the sublayers of your widget.

* * *

### hidden?: boolean

Toggles whether to show the component.

* * *

### onClick?: (event: [WidgetClickEvent](/docs/widgets/api/type-WidgetClickEvent/#widget-click-event)) => Promise<any> | void

Attach a click handler on the given node. If the given function is async or returns a promise, the widget is only terminated when the async function has completed and the promise has been resolved. The click handler is also passed a [`WidgetClickEvent`](/docs/widgets/api/type-WidgetClickEvent/) object that contains additional information about the click.

See also: [Handling User Events](/docs/widgets/handling-user-events/).

* * *

### key?: string | number

The key of the component.

* * *

### hoverStyle?: [HoverStyle](/docs/widgets/api/type-HoverStyle/#hover-style)

The style to be applied when the mouse is hovering over the component.

* * *

### tooltip?: string

The tooltip that is shown to the user when hovering over the component.

* * *

### positioning?: 'auto' | 'absolute'

This value is ignored unless the node is a direct child of an AutoLayout frame.

value

description

'auto'

Layout this node according to auto-layout rules.

'absolute'

Take this node out of the auto-layout flow, while still nesting it inside the auto-layout frame. This allows explicitly setting `x`, `y`, `width`, and `height`.

* * *

### `BlendProps`​

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

The blendMode of the component.

* * *

### opacity?: number

The opacity of the component.

* * *

### effect?: [Effect](/docs/widgets/api/type-Effect/#effect) | [Effect](/docs/widgets/api/type-Effect/#effect)\[\]

The effect of the component.

* * *

### `ConstraintProps`​

### x?: number | [HorizontalConstraint](/docs/widgets/api/type-Constraint/#horizontal-constraint)

The x position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

### y?: number | [VerticalConstraint](/docs/widgets/api/type-Constraint/#vertical-constraint)

The y position of the node.

This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.

* * *

## Default Props​

Prop

Defaults

`name`

`""`

`hidden`

`false`

`x`

`0`

`y`

`0`

`blendMode`

`"pass-through"`

`opacity`

`1`

`effect`

`[]`

`width`

`200`

`height`

`"hug-contents"`

`rotation`

`0`

`flipVertical`

`false`

`fontFamily`

`"Inter"`

`horizontalAlignText`

`"left"`

`verticalAlignText`

`"top"`

`letterSpacing`

`0`

`lineHeight`

`"auto"`

`textDecoration`

`"none"`

`textCase`

`"original"`

`fontSize`

`16`

`italic`

`false`

`fill`

`"#000000"`

`blendMode`

`"normal"`

`fontWeight`

`400`

`paragraphIndent`

`0`

`paragraphSpacing`

`0`

`placeholderProps`

`{ opacity: 0.3 }`

[

Previous

Span

](/docs/widgets/api/component-Span/)[

Next

Rectangle

](/docs/widgets/api/component-Rectangle/)

*   InputProps
*   Text Style Props
*   BaseProps
    *   BlendProps
    *   ConstraintProps
*   Default Props

---

# <Fragment /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-Fragment/

*   [](/)
*   Widgets
*   Component Types
*   Fragment

# <Fragment />

The Fragment component does not take any props outside of `children` and an optional `key` prop. This component simply renders its `children` and behaves similarly to [Fragments in React](https://reactjs.org/docs/fragments.html).

> **This component cannot be used as the root component of a widget.**

To set this up, make sure you have the following lines added to your tsconfig.json

tsconfig.json

```
{  "compilerOptions": {    "jsxFactory": "figma.widget.h",    // Add this line    "jsxFragmentFactory": "figma.widget.Fragment",    ...  }}
```

When writing JSX, you can now use the following syntax:

Fragment with empty tags

```
const { widget } = figmaconst { Text } = widgetfunction NameList({ names }: { names: string[] }) {  return (    <>      {names.map(name => <Text key={name}>{name}</Text>)}    </>  )}
```

Alternatively, if you can also reference the **Fragment** component directly if you need to:

Fragment component

```
const { widget } = figmaconst { Text, Fragment } = widgetfunction NameList({ names }: { names: string[] }) {  return (    <Fragment>      {names.map(name => <Text key={name}>{name}</Text>)}    </Fragment>  )}
```

This is useful if you need to specify the key prop when [working with lists](/docs/widgets/working-with-lists/).

[

Previous

Line

](/docs/widgets/api/component-Line/)[

Next

AlignItems

](/docs/widgets/api/type-AlignItems/)

---

# <Span /> | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/component-Span/

*   [](/)
*   Widgets
*   Component Types
*   Span

# <Span />

`Span` components are used to style ranges of characters inside of a `Text` component. `Span` components support all of the text styling properties that exist on the `Text` component. The `Span` component can **only** be a child of a `Text` component or another `Span` component.

## Usage Example​

Usage example

```
<Text  fill="#0F0"  fontSize={20}  fontFamily="Roboto"  fontWeight={400}  textCase="upper"  textDecoration="underline">  Hello{' '}  <Span    fontSize={50}    fontFamily="Poppins"    fontWeight={800}    textCase="original"    textDecoration="none"  >    Worl    <Span fontSize={30} fill="#F00" italic>      d    </Span>  </Span></Text>
```

This will result in text that looks like this:

![](https://static.figma.com/uploads/68f1a863b59cbf4fedbb32d721ae65240a17dece)

## Text Style Props​

### href?: string

If specified, turns the text node into a link that navigates to the specified `href` on click.

* * *

### fontFamily?: string

The font family (e.g. "Inter"). The supported fonts are all the fonts in the [Google Fonts](https://fonts.google.com/) library.

* * *

### letterSpacing?: number | string

The spacing between the individual characters.

* * *

### textDecoration?: 'none' | 'strikethrough' | 'underline'

Whether the text is underlined or has a strikethrough.

* * *

### fontSize?: number

The size of the font. Has minimum value of 1.

* * *

### italic?: boolean

Whether or not to italicize the text content.

* * *

### textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced'

Overrides the case of the raw characters in the text node.

* * *

### fontWeight?: [FontWeight](/docs/widgets/api/type-FontWeight/#font-weight)

The font weight eg. 400, 500 or 'medium', 'bold'.

* * *

### fill?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [Paint](/docs/widgets/api/type-Paint/#paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill in the text.

* * *

## Default Props​

The `Span` component has no default properties and instead inherits its properties from the parent component. So in the example below the `Span` would inherit the `fontSize` of 20 from its parent, but have a fill color of `#F00` while its parent has a fill of `#000`.

```
<Text fontSize={20} fill="#000">  Widgets <Span fill="#F00">are fun</Span></Text>
```

[

Previous

Text

](/docs/widgets/api/component-Text/)[

Next

Input

](/docs/widgets/api/component-Input/)

*   Usage Example
*   Text Style Props
*   Default Props

---

# register | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/properties/widget-register/

*   [](/)
*   Widgets
*   Global Objects
*   [figma.widget](/docs/widgets/api/figma-widget/)
*   register

# register

Used to register your widget. **This is the main entry point to widgets.**

This function expects a widget function that describes the widget and returns a Figma element (eg. one of the components AutoLayout, Frame, Text etc).

## Signature​

### [register](/docs/widgets/api/properties/widget-register/)(component: FunctionalWidget<any>): void

## Remarks​

The provided function will be called any time a widget is inserted and anytime the widget’s state is updated.

caution

The `widget.register` function should only be called once when the `manifest.main` file runs.

### Usage Example​

First widget

```
const { widget } = figmaconst { Text } = widgetfunction MyFirstWidget() {  return <Text>Hello Widget</Text>}widget.register(MyFirstWidget)
```

[

Previous

figma.widget

](/docs/widgets/api/figma-widget/)[

Next

useSyncedState

](/docs/widgets/api/properties/widget-usesyncedstate/)

*   Signature
*   Remarks
    *   Usage Example

---

# waitForTask | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/properties/widget-waitfortask/

*   [](/)
*   Widgets
*   Global Objects
*   [figma.widget](/docs/widgets/api/figma-widget/)
*   waitForTask

# waitForTask

The `waitForTask` function is useful for doing asynchronous work (eg. data fetching) in `useEffect`. It takes a promise and keeps the widget alive until the promise is resolved (or if there’s an explicit call to `figma.closePlugin`).

## Signature​

### [waitForTask](/docs/widgets/api/properties/widget-waitfortask/)(task: Promise<any>): void

## Parameters​

Parameter

Description

`task`

The widget will only be terminated when the given task is resolved

## Remarks​

One of the main use cases of `waitForTask` is doing data fetching when a widget is inserted onto the canvas. When paired with `useEffect`, you can make a network request via an iframe and persist the response in a widget state. The `waitForTask` call will prevent the widget from being terminated until the given promise has resolved.

### Usage Example:​

waitForTask example

```
const { widget } = figmaconst { Text, useEffect, waitForTask, useSyncedState } = widgetfunction WaitForTaskExample() {  const [textContent, setTextContent] = useSyncedState("text", "Initial")  useEffect(() => {    waitForTask(new Promise(resolve => {      // Simulate async work      setTimeout(() => {        if (textContent !== "Final") {          setTextContent("Final")        }        // Resolve the task        resolve()      }, 1000)    }))  })  return <Text>{textContent}</Text>}widget.register(WaitForTaskExample)
```

[

Previous

useStickableHost

](/docs/widgets/api/properties/widget-usestickablehost/)[

Next

useWidgetId

](/docs/widgets/api/properties/widget-usewidgetid/)

*   Signature
*   Parameters
*   Remarks
    *   Usage Example:

---

# colorMapToOptions | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/properties/widget-colormaptooptions/

*   [](/)
*   Widgets
*   Global Objects
*   [figma.widget](/docs/widgets/api/figma-widget/)
*   colorMapToOptions

# colorMapToOptions

info

This API is only available in FigJam

The `colorMapToOptions` takes in a [ColorPalette](/docs/plugins/api/ColorPalette/), a map from color names to values, and returns `WidgetPropertyMenuColorSelectorOption[]`. This helper function enables developers to use `figma.constants.colors.*`, official FigJam color palettes, in the `PropertyMenu`.

## Signature​

### [colorMapToOptions](/docs/widgets/api/properties/widget-colormaptooptions/)(colorPalette: { \[key: string\]: string }): WidgetPropertyMenuColorSelectorOption\[\]

## Remarks​

### Usage Example:​

colorMapToOptions example

```
const { widget } = figmaconst { colorMapToOptions, useSyncedState, usePropertyMenu, Text } = widgetfunction colorPaletteExample() {  const [color, setColor] = useSyncedState("theme", figma.constants.colors.figJamBase.black)  usePropertyMenu(    [      {        itemType: 'color-selector',        propertyName: 'colors',        tooltip: 'Color selector',        selectedOption: color,        options: [          ...figma.widget.colorMapToOptions(figma.constants.colors.figJamBase)          {option: '#f5427b', tooltip: 'Hot Pink'}        ],      },    ],    ({propertyName, propertyValue}) => {      if (propertyName === "colors") {        setColor(propertyValue)      }    },  )  return (    <Text fill={color}>      String(color)    </Text>  )}widget.register(colorPaletteExample)
```

[

Previous

useWidgetId

](/docs/widgets/api/properties/widget-usewidgetid/)[

Next

AutoLayout

](/docs/widgets/api/component-AutoLayout/)

*   Signature
*   Remarks
    *   Usage Example:

---

# useEffect | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/properties/widget-useeffect/

*   [](/)
*   Widgets
*   Global Objects
*   [figma.widget](/docs/widgets/api/figma-widget/)
*   useEffect

# useEffect

The `useEffect` hook can be useful for running code that should run anytime the state of a widget changes or a widget is interacted with. You can use it to do data fetching when a component mounts (by using it with `waitForTask` ) or keeping state in sync between an iframe and the widget.

## Signature​

### [useEffect](/docs/widgets/api/properties/widget-useeffect/)(effect: () => (() => void) | void): void

## Parameters​

Parameter

Description

`effect`

A function that is executed whenever a widget's state is updated. If a function is returned by this function, the returned function will be called prior to running effects again.

info

Note: Because of [How Widgets Run](/docs/widgets/how-widgets-run/), this function should handle being called multiple times with the same state.

## Remarks​

There are three main use cases of `useEffect`:

**Initializing network or plugin API-dependent widget state**

[Rendering code](/docs/widgets/how-widgets-run/#rendering-code) is synchronous and should only depend on widget state - if you wish to initialize widget state using information from the network (eg. HTTP requests in an iframe) or using information about the file (eg. using `figma.currentPage.selection`) - you can do this in `useEffect`. After the widget has rendered for the first time, any callback to `useEffect` is executed. Code in the function passed to `useEffect` is able to update widget state and perform asynchronous tasks (when paired with `waitForTask`).

**Setting up event handlers**

You might have multiple calls to `figma.showUI` in various event handler (eg. `onClick` on various nodes or via `usePropertyMenu` actions) and want to consolidate message handling in one place. `useEffect` is a great place for this. Effects are guaranteed to have run before any event handler code is executed and after a widget re-renders (eg. in response to state changes).

useEffect with figma.ui.onmessage

```
const { widget } = figmaconst { Text, useEffect, waitForTask } = widgetfunction EventHandlerExample() {  useEffect(() => {    waitForTask(new Promise(resolve => {      figma.ui.onmessage = (msg) => {        console.log(msg)        resolve()      }    }))  })  return <Text>Event handler example</Text>}widget.register(EventHandlerExample)
```

info

Note: `useEffect` is called **every time** a widget's state is changed. This means that if you are setting up an event listener using [`figma.on`](/docs/plugins/api/properties/figma-on/) (or [`figma.ui.on`](/docs/plugins/api/properties/figma-ui-on/)), you need to make sure to remove the listener using the corresponding `off` function in the function returned by your `useEffect` callback. Not removing an event listener can lead to unexpected behavior where your code responds to an event multiple times.

Here's an example of how to use `useEffect` to set up an event handler and clean it up when the widget is unmounted. In this example, we're using figma.on("selectionchange") to render the number of selected nodes as part of the widget.

useEffect with figma.on('selectionchange')

```
const { widget } = figmaconst { Text, useEffect, waitForTask, useSyncedState } = widgetfunction EventHandlerExample() {  const [numNodes, setNumNodes] = useSyncedState('count', () => {    return figma.currentPage.selection.length  })  useEffect(() => {    let resolvePromise;    const onSelectionChange = () => {      setNumNodes(figma.currentPage.selection.length)      resolvePromise?.()    }    waitForTask(new Promise(resolve => {      resolvePromise = resolve;      figma.on('selectionchange', onSelectionChange)    }))    return () => {      figma.off('selectionchange', onSelectionChange)    }  })  return <Text>Number of selected nodes: {numNodes}</Text>}widget.register(EventHandlerExample)
```

**Consolidating state updating side-effects**

Because `useEffect` callbacks are run whenever a widget state changes - they are good candidates for performing any side-effects. This is especially useful if you have multiple functions in your widget that might update a widget's state and you want to consistently trigger the same side-effects based the final widget's state.

## Usage Example​

useEffect example

```
const { widget } = figmaconst { Text, useEffect } = widgetfunction UseEffectExample() {  useEffect(() => {    console.log("useEffect callback called")  })  return <Text>useEffect example</Text>}widget.register(UseEffectExample)
```

[

Previous

usePropertyMenu

](/docs/widgets/api/properties/widget-usepropertymenu/)[

Next

useStickable

](/docs/widgets/api/properties/widget-usestickable/)

*   Signature
*   Parameters
*   Remarks
*   Usage Example

---

# usePropertyMenu | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/properties/widget-usepropertymenu/

*   [](/)
*   Widgets
*   Global Objects
*   [figma.widget](/docs/widgets/api/figma-widget/)
*   usePropertyMenu

# usePropertyMenu

The `usePropertyMenu` hook lets you specify the property menu to show when the widget is selected (See image below).

## Signature​

### [usePropertyMenu](/docs/widgets/api/properties/widget-usepropertymenu/)(items: [WidgetPropertyMenuItem](/docs/widgets/api/type-PropertyMenu/#widget-property-menu-item)\[\], onChange: (event: [WidgetPropertyEvent](/docs/widgets/api/type-PropertyMenu/#widget-property-event)) => void | Promise<void>): void

## Parameters​

Parameter

Description

`items`

A list of `WidgetPropertyMenuItem`s to render when the widget is clicked

`onChange`

The function to call when a menu item is clicked. This function is called with an object containing the `propertyName` of the item that was clicked on.

## Remarks​

When building your widget, the property menu is a way to provide a menu for your widget. When a user clicks on the property menu, the associated callback is triggered.

![PropertyMenuExample](https://static.figma.com/uploads/e6970d5f4851a4875387f0ec8f41c35a9f7c538c)

### Usage Example​

usePropertyMenu example

```
const { widget } = figmaconst { useSyncedState, usePropertyMenu, AutoLayout, Text } = widgetfunction PropertyMenuWidget() {  const [color, setColor] = useSyncedState("theme", "#e06666")  const [fruit, setFruit] = useSyncedState("fruit", "mango")  const fruitOptions = [{option: "mango", label: "Mango"}, {option: "apple", label: "Apple"}]  usePropertyMenu(    [     {        itemType: 'action',        tooltip: 'Action',        propertyName: 'action',      },      {        itemType: 'separator',      },      {        itemType: 'color-selector',        propertyName: 'colors',        tooltip: 'Color selector',        selectedOption: color,        options: [{option: "#e06666", tooltip: "Red"}, {option: "#ffe599", tooltip: "Yellow"} ],      },      {        itemType: 'dropdown',        propertyName: 'fruits',        tooltip: 'Fruit selector',        selectedOption: fruit,        options: fruitOptions,      },      {        itemType: 'link',        propertyName: 'fruitLink',        tooltip: 'Learn about fruit!',        icon: null,        href: 'https://en.wikipedia.org/wiki/Fruit',      },    ],    ({propertyName, propertyValue}) => {      if (propertyName === "colors") {        setColor(propertyValue)      } else if (propertyName === "fruits") {        setFruit(propertyValue)      } else if (propertyName === "action") {        console.log(propertyName)      }    },  )  return (    <AutoLayout      verticalAlignItems={'center'}      padding={16}    >      <Text fontSize={32} width={200} horizontalAlignText={'center'} fill={color}>        {fruitOptions.find(f => f.option === fruit).label}      </Text>    </AutoLayout>  )}widget.register(PropertyMenuWidget)
```

[

Previous

useSyncedMap

](/docs/widgets/api/properties/widget-usesyncedmap/)[

Next

useEffect

](/docs/widgets/api/properties/widget-useeffect/)

*   Signature
*   Parameters
*   Remarks
    *   Usage Example

---

# useSyncedMap | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/properties/widget-usesyncedmap/

*   [](/)
*   Widgets
*   Global Objects
*   [figma.widget](/docs/widgets/api/figma-widget/)
*   useSyncedMap

# useSyncedMap

The `useSyncedMap` hook works similarly to `useSyncedState`, but each value within the map is updated last-writer-wins, instead of the entire map being overwritten last-writer-wins.

## Signature​

### [useSyncedMap](/docs/widgets/api/properties/widget-usesyncedmap/)<T>(name: string): [SyncedMap](/docs/widgets/api/type-SyncedMap/#synced-map)<T>

## Parameters​

Parameter

Description

`name`

A storage name assigned to this syncedMap. If your widgets uses multiple synced maps, it is important that this is unique across the multiple \`useSyncedMap calls.

## Remarks​

The main use case of `useSyncedMap` is to support multiple clients updating widget data concurrently. When this happens, the synced map will merge the changes in the order they are received by the server, adding / updating / removing keys. In comparison, a similar value in `useSyncedState` will be clobbered by the last client.

The return value of `useSyncedMap` is a `Map` like JavaScript object that implements methods like `get`, `set`, `delete`, `keys()` etc.

info

Besides `useSyncedMap`, another way to store data on a widget is `useSyncedState`. These have different characteristics and use cases. See [Widget State & Multiplayer](/docs/widgets/widget-state-and-multiplayer/) for more information on when you should use one over the other.

### Usage Example​

useSyncedMap example

```
const { widget } = figmaconst { useSyncedMap, Rectangle } = widgetfunction SyncedMapExample() {  const voteMap = useSyncedMap<number>("sessionIdToVotes")  return (    <Rectangle      onClick={() => {        const sessionId = figma.activeUsers[0].sessionId        if (!voteMap.get(sessionId)) {          voteMap.set(sessionId, 1)        }      }}    />  )}widget.register(SyncedMapExample)
```

[

Previous

useSyncedState

](/docs/widgets/api/properties/widget-usesyncedstate/)[

Next

usePropertyMenu

](/docs/widgets/api/properties/widget-usepropertymenu/)

*   Signature
*   Parameters
*   Remarks
    *   Usage Example

---

# useWidgetId | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/properties/widget-usewidgetid/

*   [](/)
*   Widgets
*   Global Objects
*   [figma.widget](/docs/widgets/api/figma-widget/)
*   useWidgetId

# useWidgetId

The `useWidgetId` hook gives you a way to reference the active widget node in event handlers like `onClick`. It returns a node `id` which can be used to retrieve and identify the active WidgetNode via the plugin API (eg. `figma.getNodeById`).

## Signature​

### [useWidgetId](/docs/widgets/api/properties/widget-usewidgetid/)(): string

## Remarks​

caution

Note that `figma.getNodeById` shouldn’t be called when rendering a widget (this will throw an error). Instead, this should be used inside event handlers where using the plugin API is allowed. See the [Rendering Code](/docs/widgets/how-widgets-run/#rendering-code) for more details.

### Usage Example​

useWidgetId example

```
const { widget } = figmaconst { Text, useWidgetId } = widgetfunction UseWidgetIdExample() {  const widgetId = useWidgetId()  return (    <Text      onClick={() => {        const widgetNode = figma.getNodeById(widgetId) as WidgetNode;        const clonedWidget = widgetNode.clone();        // Position the cloned widget beside this widget        widgetNode.parent!.appendChild(clonedWidget);        clonedWidget.x = widgetNode.x + widgetNode.width + 50;        clonedWidget.y = widgetNode.y;      }}    >      Make a copy    </Text>  )}widget.register(UseWidgetIdExample)
```

[

Previous

waitForTask

](/docs/widgets/api/properties/widget-waitfortask/)[

Next

colorMapToOptions

](/docs/widgets/api/properties/widget-colormaptooptions/)

*   Signature
*   Remarks
    *   Usage Example

---

# WidgetStuckEvent | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-WidgetStuckEvent/

*   [](/)
*   Widgets
*   Data Types
*   WidgetStuckEvent

# WidgetStuckEvent

Parameter passed to the callback of **[`useStickable`](/docs/widgets/api/properties/widget-usestickable/)**.

### newHostId: string | null

This is the id of the new node that your widget is stuck to or null if it is no longer stuck to anything.

* * *

### oldHostId: string | null

This is the id of the node that your widget was stuck to or null if it is no longer stuck to anything.

* * *

[

Previous

WidgetClickEvent

](/docs/widgets/api/type-WidgetClickEvent/)[

Next

WidgetAttachedStickablesChangedEvent

](/docs/widgets/api/type-WidgetAttachedStickablesChangedEvent/)

---

# WidgetAttachedStickablesChangedEvent | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-WidgetAttachedStickablesChangedEvent/

*   [](/)
*   Widgets
*   Data Types
*   WidgetAttachedStickablesChangedEvent

# WidgetAttachedStickablesChangedEvent

Parameter passed to the callback of **[`useStickableHost`](/docs/widgets/api/properties/widget-usestickablehost/)**.

### stuckNodeIds: string\[\]

These are the node IDs that are newly stuck to your widget.

* * *

### unstuckNodeIds: string\[\]

These are the node IDs that were removed from your widget. Note that these nodes could also have been deleted.

* * *

[

Previous

WidgetStuckEvent

](/docs/widgets/api/type-WidgetStuckEvent/)

---

# HoverStyle | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-HoverStyle/

*   [](/)
*   Widgets
*   Data Types
*   HoverStyle

# HoverStyle

For more details about hover states see this guide: [Adding Hover States](/docs/widgets/adding-hover-states/).

```
interface HoverStyle {  fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]  stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]  opacity?: number}
```

[

Previous

GradientPaint

](/docs/widgets/api/type-GradientPaint/)[

Next

ImagePaint

](/docs/widgets/api/type-ImagePaint/)

---

# SyncedMap | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-SyncedMap/

*   [](/)
*   Widgets
*   Data Types
*   SyncedMap

# SyncedMap

The return value of [`useSyncedMap`](/docs/widgets/api/properties/widget-usesyncedmap/).

```
interface SyncedMap<T = any> {  readonly size: number  has(key: string): boolean  get(key: string): T | undefined  set(key: string, value: T): void  delete(key: string): void  keys(): string[]  values(): T[]  entries(): [string, T][]}
```

### length: number \[readonly\]

**DEPRECATED:** Use size instead.

* * *

### size: number \[readonly\]

Returns the number of keys in this map.

* * *

### has(key: string): boolean

Returns whether the given key exists.

* * *

### get(key: string): T | undefined

Returns the value of the given key if one exists.

* * *

### set(key: string, value: T): void

Persist the given key/value pair on the map.

info

Note: value has to be JSON-serializable.

* * *

### delete(key: string): void

Removes the given key and its value from the map if it exists.

* * *

### keys(): string\[\]

Returns an array of keys in the map.

* * *

### values(): T\[\]

Returns an array of values in the map.

* * *

### entries(): \[string, T\]\[\]

Returns an array of \[key, value\] tuples in the map.

* * *

[

Previous

StrokeCap

](/docs/widgets/api/type-StrokeCap/)[

Next

TextEditEvent

](/docs/widgets/api/type-TextEditEvent/)

---

# PropertyMenu | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-PropertyMenu/

*   [](/)
*   Widgets
*   Data Types
*   PropertyMenu

# PropertyMenu

## `WidgetPropertyMenuItem`​

```
type WidgetPropertyMenuItem =  | WidgetPropertyMenuActionItem  | WidgetPropertyMenuSeparatorItem  | WidgetPropertyMenuColorItem  | WidgetPropertyMenuDropdownItem  | WidgetPropertyMenuToggleItem  | WidgetPropertyMenuLinkItemtype WidgetPropertyMenu = WidgetPropertyMenuItem[]
```

## `WidgetPropertyMenuActionItem`​

The action item provides a simple action button in the property menu. When selected, the property menu callback will be called with the corresponding `propertyName` of the item.

![PropertyMenuActionExample](https://static.figma.com/uploads/d933305fa46c2b470971835cb4700c83de1e3cd3)

```
interface WidgetPropertyMenuActionItem {  itemType: 'action'  tooltip: string  propertyName: string  icon?: string}
```

### itemType: 'action'

Specifies the action item type.

* * *

### tooltip: string

The tooltip of the button.

Used as the button label if an icon is not specified.

* * *

### propertyName: string

Identifies the menu item. This is used to indicate which item was clicked in the callback.

* * *

### icon?: string

If specified, it will be used to render the button; otherwise, we'll fallback to the tooltip as the button label.

info

The provided svg should contain the following attribute to be valid: xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"

* * *

## `WidgetPropertyMenuSeparatorItem`​

The separator item is a non-interactive element. While not required to use, using separators is a way to organize large property menus by grouping related property menu items together.

![PropertyMenuSeparatorExample](https://static.figma.com/uploads/d42b97e7c89f7ba94443693e6f2dc2c5d922b179)

```
interface WidgetPropertyMenuSeparatorItem {  itemType: 'separator'}
```

### itemType: 'separator'

Specifies the separator item type.

* * *

## `WidgetPropertyMenuColorItem`​

The color selector item is a way for your widget to provide users a way to pick colors. For example, this can be a way to change the theme of your widget.

![PropertyMenuColorExample](https://static.figma.com/uploads/b8eebc9c3e890149cf65acdd93374baca586c9b9)

```
interface WidgetPropertyMenuColorSelectorOption {  tooltip: string  option: HexCode}interface WidgetPropertyMenuColorItem {  itemType: 'color-selector'  tooltip: string  propertyName: string  options: WidgetPropertyMenuColorSelectorOption[]  selectedOption: string}
```

### itemType: 'color-selector'

Specifies the color selector item type.

* * *

### tooltip: string

The tooltip of the selector.

* * *

### propertyName: string

Identifies the menu item. This is used to indicate which item was clicked in the callback.

* * *

### options: WidgetPropertyMenuColorSelectorOption\[\]

Array of color options to display to the user when selected. This array cannot be empty.

* * *

### selectedOption: string

The currently selected color. This option string should match one of the `option` values specified in `options`.

* * *

## `WidgetPropertyMenuDropdownItem`​

The dropdown item allows users to select from an array of `WidgetPropertyMenuDropdownOption`.

In `WidgetPropertyMenuDropdownOption`, the `label` field will be displayed to the user.

![PropertyMenuDropdownExample](https://static.figma.com/uploads/bda3b6587a3c25bf8c9e102acedf40d31d696c73)

```
 interface WidgetPropertyMenuDropdownOption {  option: string  label: string // displayed in dropdown}interface WidgetPropertyMenuDropdownItem {  itemType: 'dropdown'  tooltip: string  propertyName: string  options: WidgetPropertyMenuDropdownOption[]  selectedOption: string}
```

### itemType: 'dropdown'

Specifies the dropdown item type.

* * *

### tooltip: string

The tooltip of the dropdown component.

* * *

### propertyName: string

Identifies the menu item. This is used to indicate which item was clicked in the callback.

* * *

### options: WidgetPropertyMenuDropdownOption\[\]

An array of options. This array cannot be empty.

* * *

### selectedOption: string

The currently selected option. This option string should match one of the `option` values specified in \`options

* * *

## `WidgetPropertyMenuToggleItem`​

The toggle item provides a button that allows the user to toggle a boolean value in the property menu. When selected, the property menu callback will be called with the corresponding `propertyName` of the item. isToggled highlights the button when set to true.

![PropertyMenuToggleExample](https://static.figma.com/uploads/82d35b9a0ad3095e212b8570196e4a6b8dfe9b5d) ![PropertyMenuToggleActiveExample](https://static.figma.com/uploads/9e8d4952de540b886a05755231dbf4d0149add6c)

```
interface WidgetPropertyMenuToggleItem {  itemType: 'toggle'  tooltip: string  propertyName: string  isToggled: boolean  icon?: string}
```

### itemType: 'toggle'

Specifies the toggle item type.

* * *

### tooltip: string

The tooltip of the button.

Used as the button label if an icon is not specified.

* * *

### propertyName: string

Identifies the menu item. This is used to indicate which item was clicked in the callback.

* * *

### isToggled: boolean

The state of the toggle.

* * *

### icon?: string

If specified, it will be used to render the button; otherwise, we'll fallback to the tooltip as the button label.

info

The provided svg should contain the following attribute to be valid: xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"

* * *

## `WidgetPropertyMenuLinkItem`​

The link item allows users to natively open links to other pages. There are some benefits to opening links this way, namely:

*   The link opens in a new tab.
*   The link menu item type is easier than using an iFrame to open links.
*   The link renders natively with an `<a>` tag, which prevents users from getting blocked by their browsers.

Importantly, the link menu item type does not trigger a property menu callback.

![PropertyMenuLinkExample](https://static.figma.com/uploads/c6a949b138023a025532ee34b74585d2d2f97dde)

```
interface WidgetPropertyMenuLinkItem {  itemType: 'link'  tooltip: string  propertyName: string  href: string  icon?: string}
```

### itemType: 'link'

Specifies the link item type.

* * *

### tooltip: string

The tooltip of the link component.

* * *

### propertyName: string

Identifies the menu item.

* * *

### href: string

The URL that opens when a user clicks the link item.

* * *

### icon?: string | null

If specified, it will be used to render the button; otherwise, we'll fallback to a default icon that looks like the image below:

![DefaultLinkIcon](https://static.figma.com/uploads/357ced3a754c95d44940b0067906f4b13ce5bc15)

In order to render the tooltip as the button's text, pass `null` as the value of `icon`.

info

The provided svg should contain the following attribute to be valid: xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"

* * *

## `WidgetPropertyEvent`​

The widget property event is an passed into the `onChange` function. Here is a summary of the `WidgetPropertyEvent` for each `itemType`. Note that the `"separator"` and `"link"` item types will not trigger the `onChange` function.

itemType

propertyName

propertyValue

`"action"`

Yes

`undefined`

`"color-selector"`

Yes

hexcode `string` of the selected color.

`"dropdown"`

Yes

`string` of the selected option in the dropdown.

`"toggle"`

Yes

`undefined`

`"separator"`

N/A

N/A

`"link"`

N/A

N/A

```
type WidgetPropertyEvent = {  propertyName: string  propertyValue?: string | undefined}
```

### propertyName: string

The propertyName of the item that was clicked.

* * *

### propertyValue?: string | undefined

The propertyValue of the item that was selected. This value will be a string value for `"dropdown"` and `"color-selector"` item types.

* * *

[

Previous

PlaceholderProps

](/docs/widgets/api/type-PlaceholderProps/)[

Next

Size

](/docs/widgets/api/type-Size/)

*   WidgetPropertyMenuItem
*   WidgetPropertyMenuActionItem
*   WidgetPropertyMenuSeparatorItem
*   WidgetPropertyMenuColorItem
*   WidgetPropertyMenuDropdownItem
*   WidgetPropertyMenuToggleItem
*   WidgetPropertyMenuLinkItem
*   WidgetPropertyEvent

---

# WidgetClickEvent | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-WidgetClickEvent/

*   [](/)
*   Widgets
*   Data Types
*   WidgetClickEvent

# WidgetClickEvent

Parameter passed to onClick callbacks. See also: [Handling User Events](/docs/widgets/handling-user-events/).

```
type WidgetClickEvent = {  canvasX: number  canvasY: number  offsetX: number  offsetY: number}
```

### canvasX: number

canvasX is the x position of the mouse relative to the canvas. This is the same as the absolute position that is used to position a node.

* * *

### canvasY: number

canvasY is the y position of the mouse relative to the canvas. This is the same as the absolute position that is used to position a node.

* * *

### offsetX: number

offsetX is the X coordinate of the mouse relative to the component that was clicked.

* * *

### offsetY: number

offsetY is the Y coordinate of the mouse relative to the component that was clicked.

* * *

[

Previous

Transform

](/docs/widgets/api/type-Transform/)[

Next

WidgetStuckEvent

](/docs/widgets/api/type-WidgetStuckEvent/)

---

# BlendMode | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-BlendMode/

*   [](/)
*   Widgets
*   Data Types
*   BlendMode

# BlendMode

Blend mode describes how a color blends with what's underneath it.

These blend modes are fairly standard and should match what you would find in other image processing tools. [Some examples](https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode)

```
type BlendMode =  | 'pass-through'  | 'normal'  | 'multiply'  | 'screen'  | 'overlay'  | 'darken'  | 'lighten'  | 'color-dodge'  | 'color-burn'  | 'hard-light'  | 'soft-light'  | 'difference'  | 'exclusion'  | 'hue'  | 'saturation'  | 'color'  | 'luminosity'
```

[

Previous

ArcData

](/docs/widgets/api/type-ArcData/)[

Next

Color

](/docs/widgets/api/type-Color/)

---

# Effect | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-Effect/

*   [](/)
*   Widgets
*   Data Types
*   Effect

# Effect

Figma has four types of effects:

![](https://static.figma.com/uploads/9def6cce093b164306328ee228028155d13d72d0)

These are split into 3 types:

```
type Effect =  | DropShadowEffect  | InnerShadowEffect  | BlurEffect
```

## `DropShadowEffect`​

```
interface DropShadowEffect {  type: 'drop-shadow'  color: HexCode | Color  offset: Vector  blur: number  blendMode?: BlendMode  spread?: number  visible?: boolean  showShadowBehindNode?: boolean}
```

### type: 'drop-shadow'

The type of the shadow.

* * *

### color: HexCode | [Color](/docs/widgets/api/type-Color/#color)

The color of the shadow, including its opacity.

* * *

### offset: Vector

The offset of the shadow relative to its object. Use this property to simulate the direction of the light.

* * *

### blur: number

The blur radius of the shadow. Must be >= 0. A lower radius creates a sharper shadow.

* * *

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

Determines how the color of this shadow blends with the colors underneath it.

* * *

### spread?: number

The distance by which to expand (or contract) the shadow. For drop shadows, a positive spread value creates a shadow larger than the node, whereas a negative value creates a shadow smaller than the node. For inner shadows, a positive `spread` value contracts the shadow. Additionally, `spread` values are only accepted on rectangles, ellipses, frames, components, and instances with visible fill paints and `clipsContent` enabled. When left unspecified, the default value is 0.

* * *

### visible?: boolean

Whether this shadow is visible.

* * *

### showShadowBehindNode?: boolean

Whether the drop shadow should show behind translucent or transparent pixels within the node's geometry. Defaults to `true`.

* * *

### Example Usage​

Drop Shadow

```
const { widget } = figmaconst { Frame } = widgetfunction DropShadowExample() {  return (    <Frame      effect={{        type: "drop-shadow",        color: "#00000040",        offset: {          x: 4,          y: 4,        },        blur: 4,      }}      fill="#FFF"      width={100}      height={100}    />  )}widget.register(DropShadowExample)
```

## `InnerShadowEffect`​

```
interface InnerShadowEffect {  type: 'inner-shadow'  color: HexCode | Color  offset: Vector  blur: number  blendMode?: BlendMode  spread?: number  visible?: boolean}
```

### type: 'inner-shadow'

The type of the shadow.

* * *

### color: HexCode | [Color](/docs/widgets/api/type-Color/#color)

The color of the shadow, including its opacity.

* * *

### offset: Vector

The offset of the shadow relative to its object. Use this property to simulate the direction of the light.

* * *

### blur: number

The blur radius of the shadow. Must be >= 0. A lower radius creates a sharper shadow.

* * *

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

Determines how the color of this shadow blends with the colors underneath it.

* * *

### spread?: number

The distance by which to expand (or contract) the shadow. For drop shadows, a positive spread value creates a shadow larger than the node, whereas a negative value creates a shadow smaller than the node. For inner shadows, a positive `spread` value contracts the shadow. Additionally, `spread` values are only accepted on rectangles, ellipses, frames, components, and instances with visible fill paints and `clipsContent` enabled. When left unspecified, the default value is 0.

* * *

### visible?: boolean

Whether this shadow is visible.

* * *

### Example Usage​

Inner Shadow

```
const { widget } = figmaconst { Frame } = widgetfunction InnerShadowExample() {  return (    <Frame      effect={{        type: "inner-shadow",        color: "#00000040",        offset: {          x: 4,          y: 4,        },        blur: 4,      }}      fill="#FFF"      width={100}      height={100}    />  )}widget.register(InnerShadowExample)
```

## `BlurEffect`​

```
interface BlurEffect {  type: 'layer-blur' | 'background-blur'  blur: number  visible?: boolean}
```

### type: 'layer-blur' | 'background-blur'

The type of the blur.

* * *

### blur: number

The blur radius of the shadow. Must be >= 0. A lower radius creates a sharper shadow.

* * *

### visible?: boolean

Whether this shadow is visible.

* * *

### Example Usage​

Inner Shadow

```
const { widget } = figmaconst { Frame } = widgetfunction BlurExample() {  return (    <Frame      effect={{        blur: 4,        type: "layer-blur",      }}      fill="#FFF"      width={100}      height={100}    />  )}widget.register(BlurExample)
```

[

Previous

CornerRadius

](/docs/widgets/api/type-CornerRadius/)[

Next

FontWeight

](/docs/widgets/api/type-FontWeight/)

*   DropShadowEffect
    *   Example Usage
*   InnerShadowEffect
    *   Example Usage
*   BlurEffect
    *   Example Usage

---

# Constraint | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-Constraint/

*   [](/)
*   Widgets
*   Data Types
*   Constraint

# Constraint

## `VerticalConstraint`​

```
type VerticalConstraint =  | TopConstraint  | BottomConstraint  | TopBottomConstraint  | CenterConstraint  | VerticalScaleConstraintexport interface TopConstraint {  type: 'top'  offset: number}export interface BottomConstraint {  type: 'bottom'  offset: number}export interface TopBottomConstraint {  type: 'top-bottom'  topOffset: number  bottomOffset: number}export interface CenterConstraint {  type: 'center'  offset: number}export interface VerticalScaleConstraint {  type: 'vertical-scale'  topOffsetPercent: number  bottomOffsetPercent: number}
```

## `HorizontalConstraint`​

```
type HorizontalConstraint =  | LeftConstraint  | RightConstraint  | LeftRightConstraint  | CenterConstraint  | HorizontalScaleConstraintexport interface LeftConstraint {  type: 'left'  offset: number}export interface RightConstraint {  type: 'right'  offset: number}export interface LeftRightConstraint {  type: 'left-right'  leftOffset: number  rightOffset: number}export interface CenterConstraint {  type: 'center'  offset: number}export interface HorizontalScaleConstraint {  type: 'horizontal-scale'  leftOffsetPercent: number  rightOffsetPercent: number}
```

[

Previous

Color

](/docs/widgets/api/type-Color/)[

Next

CornerRadius

](/docs/widgets/api/type-CornerRadius/)

*   VerticalConstraint
*   HorizontalConstraint

---

# Size | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-Size/

*   [](/)
*   Widgets
*   Data Types
*   Size

# Size

## Size​

```
type Size = number | 'fill-parent'
```

## AutolayoutSize​

```
type AutolayoutSize = Size | 'hug-contents'
```

[

Previous

PropertyMenu

](/docs/widgets/api/type-PropertyMenu/)[

Next

SolidPaint

](/docs/widgets/api/type-SolidPaint/)

*   Size
*   AutolayoutSize

---

# LayoutGap | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-LayoutGap/

*   [](/)
*   Widgets
*   Data Types
*   LayoutGap

# LayoutGap

```
interface LayoutGap {  /**   * The horizontal gap between auto-layout children.   *   * `"auto"` is the same as `justify-content: space-between` in css.   */  horizontal?: number | 'auto'  /**   * The vertical gap between auto-layout children.   *   * `"auto"` is the same as `align-content: space-between` in css.   */  vertical?: number | 'auto'}
```

[

Previous

ImagePaint

](/docs/widgets/api/type-ImagePaint/)[

Next

Padding

](/docs/widgets/api/type-Padding/)

---

# Padding | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-Padding/

*   [](/)
*   Widgets
*   Data Types
*   Padding

# Padding

```
type Padding = number | FullPadding | VerticalHorizontalPadding;type FullPadding = {  top?: number  left?: number  bottom?: number  right?: number}type VerticalHorizontalPadding = {  vertical?: number  horizontal?: number}
```

[

Previous

LayoutGap

](/docs/widgets/api/type-LayoutGap/)[

Next

Paint

](/docs/widgets/api/type-Paint/)

---

# CornerRadius | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-CornerRadius/

*   [](/)
*   Widgets
*   Data Types
*   CornerRadius

# CornerRadius

```
type CornerRadius =  | number  | {      topLeft?: number      topRight?: number      bottomLeft?: number      bottomRight?: number    }
```

[

Previous

Constraint

](/docs/widgets/api/type-Constraint/)[

Next

Effect

](/docs/widgets/api/type-Effect/)

---

# Color | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-Color/

*   [](/)
*   Widgets
*   Data Types
*   Color

# Color

```
interface Color {  r: number  g: number  b: number  a: number}
```

Represents a full Figma color value. These values are from 0 to 1. For example black is `{r: 0, g: 0, b: 0, a: 1}` and white is `{r: 1, g: 1, b: 1, a: 1}`.

All colors are specified in the same color space. This color space is sRGB in modern browsers and in the Figma desktop app is either sRGB or unmanaged depending on [how you have it configured](https://www.figma.com/blog/figma-desktop-app-improvements/#you-can-now-manage-your-color-space). Unmanaged means the color space is whatever the current color space is of your display.

## HexCode​

We also use the following type alias in our documentation to refer to a hex color string. Eg. "#FFFFFF".

```
type HexCode = string
```

[

Previous

BlendMode

](/docs/widgets/api/type-BlendMode/)[

Next

Constraint

](/docs/widgets/api/type-Constraint/)

*   HexCode

---

# Paint | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-Paint/

*   [](/)
*   Widgets
*   Data Types
*   Paint

# Paint

Figma has three types of paints: solid colors, gradients, and images.

```
type Paint = SolidPaint | GradientPaint | ImagePaint
```

## Common Props​

```
interface PaintProps {  type: PaintType  blendMode?: BlendMode  visible?: boolean  opacity?: number}type PaintType =  | 'image'  | 'solid'  | 'gradient-linear'  | 'gradient-radial'  | 'gradient-angular'  | 'gradient-diamond'
```

### type: [PaintType](/docs/widgets/api/type-Paint/#paint-type)

One of: 'image' | 'solid' | 'gradient-linear' | 'gradient-radial' | 'gradient-angular' | 'gradient-diamond'.

* * *

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

Determines how the color of this paint blends with the colors underneath it. Defaults to "NORMAL".

* * *

### visible?: boolean

Whether the paint is visible. Defaults to true.

* * *

### opacity?: number

The opacity of the paint. Must be a value between 0 and 1. Defaults to 1.

* * *

## SolidPaint​

```
interface SolidPaint extends PaintProps {  type: 'solid'  color: Color | HexCode}
```

### type: 'solid'

The type of the solid paint.

* * *

### color: [Color](/docs/widgets/api/type-Color/#color) | HexCode

The solid color of the paint.

* * *

## ImagePaint​

```
interface ImagePaint extends PaintProps {  type: 'image'  src: string  imageSize?: { width: number; height: number }  scaleMode?: ScaleMode  imageTransform?: Transform  scalingFactor?: number  rotation?: number}type ScaleMode = 'fill' | 'fit' | 'tile' | 'crop'type Transform = [[number, number, number], [number, number, number]]
```

### type: 'image'

The string literal "image".

* * *

### src: string

An Image URL or DataURI encoding the image.

* * *

### imageSize?: { width: number; height: number }

The size of the image.

* * *

### scaleMode?: ScaleMode

How the image is positioned and scaled within the layer.

* * *

### imageTransform?: [Transform](/docs/widgets/api/type-Transform/#transform)

Applicable only for `scaleMode == "crop"`. Determines how the image is positioned (thus, cropped) within the layer.

* * *

### scalingFactor?: number

Applicable only for `scaleMode == "tile"` (automatic for other modes). Determines the scaling (thus, repetition) of the image within the layer.

* * *

### rotation?: number

Applicable only for `scaleMode == "tile" | "fill" | "fit"` (automatic for `scaleMode == "CROP"`). Determines the rotation of the image within the layer. Must be in increments of +90.

* * *

## GradientPaint​

```
interface GradientPaint extends PaintProps {  type: 'gradient-linear' |        'gradient-radial' |        'gradient-angular' |        'gradient-diamond'  gradientHandlePositions: [Vector, Vector, Vector]  gradientStops: ColorStop[]}interface ColorStop {  position: number  color: Color}interface Vector {  x: number  y: number}
```

### type: 'gradient-linear' | 'gradient-radial' | 'gradient-angular' | 'gradient-diamond'

The type of gradient paint.

* * *

### gradientHandlePositions: \[Vector, Vector, Vector\]

The positioning of the gradient within the layer.

This field contains three vectors, each of which are a position in normalized object space (normalized object space is if the top left corner of the bounding box of the object is (0, 0) and the bottom right is (1,1)).

1.  The first position corresponds to the start of the gradient (value 0 for the purposes of calculating gradient stops)
2.  The second position is the end of the gradient (value 1)
3.  The third position determines the width of the gradient.

* * *

### gradientStops: ColorStop\[\]

Array of colors and their position within the gradient.

* * *

## Examples​

### Gradient Linear​

![Gradient Linear](/assets/images/gradient-linear-0a54d34856d32b57e95cd3c5f50d0b70.png)

```
  <Rectangle    width={100}    height={100}    fill={{      type: "gradient-linear",      gradientHandlePositions: [        { x: 0, y: 0.5 },        { x: 1, y: 1 },        { x: 0, y: 0 }      ],      gradientStops: [        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }      ]    }}    cornerRadius={8}  />
```

### Gradient Radial​

![Gradient Radial](/assets/images/gradient-radial-edff8adb3f50e8a42b466a1d0d033663.png)

```
  <Rectangle    width={100}    height={100}    fill={{      type: "gradient-radial",      gradientHandlePositions: [        { x: 0.5, y: 0.5 },        { x: 0.5, y: 1 },        { x: 1, y: 0.5 }      ],      gradientStops: [        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }      ]    }}    cornerRadius={8}  />
```

### Gradient Angular​

![Gradient Angular](/assets/images/gradient-angular-34d1b5cd8ccb60afd179952a38a17fc7.png)

```
  <Rectangle    width={100}    height={100}    fill={{      type: "gradient-angular",      gradientHandlePositions: [        { x: 0.5, y: 0.5 },        { x: 1, y: 0.5 },        { x: 0.5, y: 1 }      ],      gradientStops: [        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }      ]    }}    cornerRadius={8}  />
```

### Gradient Diamond​

![Gradient Diamond](/assets/images/gradient-diamond-367d343c76fc3ecfcec8e3fda07ea5ed.png)

```
  <Rectangle    width={100}    height={100}    fill={{      type: "gradient-diamond",      gradientHandlePositions: [        { x: 0.5, y: 0.5 },        { x: 0.5, y: 1 },        { x: 1, y: 0.5 }      ],      gradientStops: [        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }      ]    }}    cornerRadius={8}  />
```

[

Previous

Padding

](/docs/widgets/api/type-Padding/)[

Next

PlaceholderProps

](/docs/widgets/api/type-PlaceholderProps/)

*   Common Props
*   SolidPaint
*   ImagePaint
*   GradientPaint
*   Examples
    *   Gradient Linear
    *   Gradient Radial
    *   Gradient Angular
    *   Gradient Diamond

---

# SolidPaint | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-SolidPaint/

*   [](/)
*   Widgets
*   Data Types
*   SolidPaint

# SolidPaint

```
interface SolidPaint extends PaintProps {  type: 'solid'  color: Color | HexCode}
```

### type: 'solid'

The type of the solid paint.

* * *

### color: [Color](/docs/widgets/api/type-Color/#color) | HexCode

The solid color of the paint.

* * *

[

Previous

Size

](/docs/widgets/api/type-Size/)[

Next

StrokeAlign

](/docs/widgets/api/type-StrokeAlign/)

---

# GradientPaint | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-GradientPaint/

*   [](/)
*   Widgets
*   Data Types
*   GradientPaint

# GradientPaint

```
interface GradientPaint extends PaintProps {  type: 'gradient-linear' |        'gradient-radial' |        'gradient-angular' |        'gradient-diamond'  gradientHandlePositions: [Vector, Vector, Vector]  gradientStops: ColorStop[]}interface ColorStop {  position: number  color: Color}interface Vector {  x: number  y: number}
```

### type: 'gradient-linear' | 'gradient-radial' | 'gradient-angular' | 'gradient-diamond'

The type of gradient paint.

* * *

### gradientHandlePositions: \[Vector, Vector, Vector\]

The positioning of the gradient within the layer.

This field contains three vectors, each of which are a position in normalized object space (normalized object space is if the top left corner of the bounding box of the object is (0, 0) and the bottom right is (1,1)).

1.  The first position corresponds to the start of the gradient (value 0 for the purposes of calculating gradient stops)
2.  The second position is the end of the gradient (value 1)
3.  The third position determines the width of the gradient.

* * *

### gradientStops: ColorStop\[\]

Array of colors and their position within the gradient.

* * *

## Examples​

### Gradient Linear​

![Gradient Linear](/assets/images/gradient-linear-0a54d34856d32b57e95cd3c5f50d0b70.png)

```
  <Rectangle    width={100}    height={100}    fill={{      type: "gradient-linear",      gradientHandlePositions: [        { x: 0, y: 0.5 },        { x: 1, y: 1 },        { x: 0, y: 0 }      ],      gradientStops: [        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }      ]    }}    cornerRadius={8}  />
```

### Gradient Radial​

![Gradient Radial](/assets/images/gradient-radial-edff8adb3f50e8a42b466a1d0d033663.png)

```
  <Rectangle    width={100}    height={100}    fill={{      type: "gradient-radial",      gradientHandlePositions: [        { x: 0.5, y: 0.5 },        { x: 0.5, y: 1 },        { x: 1, y: 0.5 }      ],      gradientStops: [        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }      ]    }}    cornerRadius={8}  />
```

### Gradient Angular​

![Gradient Angular](/assets/images/gradient-angular-34d1b5cd8ccb60afd179952a38a17fc7.png)

```
  <Rectangle    width={100}    height={100}    fill={{      type: "gradient-angular",      gradientHandlePositions: [        { x: 0.5, y: 0.5 },        { x: 1, y: 0.5 },        { x: 0.5, y: 1 }      ],      gradientStops: [        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }      ]    }}    cornerRadius={8}  />
```

### Gradient Diamond​

![Gradient Diamond](/assets/images/gradient-diamond-367d343c76fc3ecfcec8e3fda07ea5ed.png)

```
  <Rectangle    width={100}    height={100}    fill={{      type: "gradient-diamond",      gradientHandlePositions: [        { x: 0.5, y: 0.5 },        { x: 0.5, y: 1 },        { x: 1, y: 0.5 }      ],      gradientStops: [        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }      ]    }}    cornerRadius={8}  />
```

[

Previous

FontWeight

](/docs/widgets/api/type-FontWeight/)[

Next

HoverStyle

](/docs/widgets/api/type-HoverStyle/)

*   Examples
    *   Gradient Linear
    *   Gradient Radial
    *   Gradient Angular
    *   Gradient Diamond

---

# StrokeAlign | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-StrokeAlign/

*   [](/)
*   Widgets
*   Data Types
*   StrokeAlign

# StrokeAlign

```
type StrokeAlign = 'inside' | 'outside' | 'center'
```

[

Previous

SolidPaint

](/docs/widgets/api/type-SolidPaint/)[

Next

StrokeCap

](/docs/widgets/api/type-StrokeCap/)

---

# ArcData | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-ArcData/

*   [](/)
*   Widgets
*   Data Types
*   ArcData

# ArcData

```
type ArcData = {  readonly startingAngle: number  readonly endingAngle: number  readonly innerRadius: number}
```

This data controls the "arc" properties of the [`Ellipse`](/docs/widgets/api/component-Ellipse/) component:

![](https://static.figma.com/uploads/abd31088233f035d829a22d99a4e481263f5db68)

The angles are in radians and the inner radius value is from 0 to 1. For the angles, 0° is the x axis and increasing angles rotate clockwise.

Examples:

Half-circle

```
// Make a half-circle<Ellipse  arcData={{  	startingAngle: 0,  	endingAngle: Math.PI,  	innerRadius: 0  }}/>
```

Donut

```
// Make a donut<Ellipse  arcData={{  	startingAngle: 0,  	endingAngle: 2 * Math.PI,  	innerRadius: 0.5  }}/>
```

[

Previous

AlignItems

](/docs/widgets/api/type-AlignItems/)[

Next

BlendMode

](/docs/widgets/api/type-BlendMode/)

---

# FontWeight | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-FontWeight/

*   [](/)
*   Widgets
*   Data Types
*   FontWeight

# FontWeight

```
type FontWeightNumerical = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900type FontWeightString =  | 'thin'  | 'extra-light'  | 'light'  | 'normal'  | 'medium'  | 'semi-bold'  | 'bold'  | 'extra-bold'  | 'black'type FontWeight = FontWeightNumerical | FontWeightString
```

[

Previous

Effect

](/docs/widgets/api/type-Effect/)[

Next

GradientPaint

](/docs/widgets/api/type-GradientPaint/)

---

# ImagePaint | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-ImagePaint/

*   [](/)
*   Widgets
*   Data Types
*   ImagePaint

# ImagePaint

```
interface ImagePaint extends PaintProps {  type: 'image'  src: string  imageSize?: { width: number; height: number }  scaleMode?: ScaleMode  imageTransform?: Transform  scalingFactor?: number  rotation?: number}type ScaleMode = 'fill' | 'fit' | 'tile' | 'crop'type Transform = [[number, number, number], [number, number, number]]
```

### type: 'image'

The string literal "image".

* * *

### src: string

An Image URL or DataURI encoding the image.

* * *

### imageSize?: { width: number; height: number }

The size of the image.

* * *

### scaleMode?: ScaleMode

How the image is positioned and scaled within the layer.

* * *

### imageTransform?: [Transform](/docs/widgets/api/type-Transform/#transform)

Applicable only for `scaleMode == "crop"`. Determines how the image is positioned (thus, cropped) within the layer.

* * *

### scalingFactor?: number

Applicable only for `scaleMode == "tile"` (automatic for other modes). Determines the scaling (thus, repetition) of the image within the layer.

* * *

### rotation?: number

Applicable only for `scaleMode == "tile" | "fill" | "fit"` (automatic for `scaleMode == "CROP"`). Determines the rotation of the image within the layer. Must be in increments of +90.

* * *

[

Previous

HoverStyle

](/docs/widgets/api/type-HoverStyle/)[

Next

LayoutGap

](/docs/widgets/api/type-LayoutGap/)

---

# PlaceholderProps | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-PlaceholderProps/

*   [](/)
*   Widgets
*   Data Types
*   PlaceholderProps

# PlaceholderProps

These props allow you to style the placeholder text in the [`Input`](/docs/widgets/api/component-Input/) component.

If any fields are `undefined`, then the values will be inherited from the props set (or the defaults) on the [`Input`](/docs/widgets/api/component-Input/) component. To ensure consistent styling, we don't allow any alignment-based properties on `PlaceholderProps`. For example, if you want to center-align the text, you should set `horizontalAlignText` on the `Input` component itself, and the placeholder will match this alignment automatically.

### fontFamily?: string

The font family (e.g. "Inter"). The supported fonts are all the fonts in the [Google Fonts](https://fonts.google.com/) library.

* * *

### letterSpacing?: number | string

The spacing between the individual characters.

* * *

### textDecoration?: 'none' | 'strikethrough' | 'underline'

Whether the text is underlined or has a strikethrough.

* * *

### fontSize?: number

The size of the font. Has minimum value of 1.

* * *

### italic?: boolean

Whether or not to italicize the text content.

* * *

### textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced'

Overrides the case of the raw characters in the text node.

* * *

### fontWeight?: [FontWeight](/docs/widgets/api/type-FontWeight/#font-weight)

The font weight eg. 400, 500 or 'medium', 'bold'.

* * *

### fill?: HexCode | [Color](/docs/widgets/api/type-Color/#color) | [Paint](/docs/widgets/api/type-Paint/#paint) | ([SolidPaint](/docs/widgets/api/type-SolidPaint/#solid-paint) | [GradientPaint](/docs/widgets/api/type-GradientPaint/#gradient-paint))\[\]

The paints used to fill in the text.

* * *

### blendMode?: [BlendMode](/docs/widgets/api/type-BlendMode/#blend-mode)

The blendMode of the component.

* * *

### opacity?: number

The opacity of the component.

* * *

### effect?: [Effect](/docs/widgets/api/type-Effect/#effect) | [Effect](/docs/widgets/api/type-Effect/#effect)\[\]

The effect of the component.

* * *

[

Previous

Paint

](/docs/widgets/api/type-Paint/)[

Next

PropertyMenu

](/docs/widgets/api/type-PropertyMenu/)

---

# StrokeCap | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-StrokeCap/

*   [](/)
*   Widgets
*   Data Types
*   StrokeCap

# StrokeCap

```
type StrokeCap = 'none' | 'round' | 'square' | 'arrow-lines' | 'arrow-equilateral'
```

The possible values are:

*   `'none'`: nothing is added to the end of the stroke
*   `'round'`: a semi-circle is added to the end of the stroke
*   `'square'`: a square is added to the end of the stroke
*   `'arrow-lines'`: an arrow made up of two lines is added to the end of the stroke

[

Previous

StrokeAlign

](/docs/widgets/api/type-StrokeAlign/)[

Next

SyncedMap

](/docs/widgets/api/type-SyncedMap/)

---

# TextEditEvent | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-TextEditEvent/

*   [](/)
*   Widgets
*   Data Types
*   TextEditEvent

# TextEditEvent

```
interface TextEditEvent {  /**   * The text that was edited in the input component.   */  characters: string}
```

[

Previous

SyncedMap

](/docs/widgets/api/type-SyncedMap/)[

Next

Transform

](/docs/widgets/api/type-Transform/)

---

# Transform | Developer Docs

Source: https://developers.figma.com/docs/widgets/api/type-Transform/

*   [](/)
*   Widgets
*   Data Types
*   Transform

# Transform

```
type Transform = [  [number, number, number],  [number, number, number]]
```

A transformation matrix is standard way in computer graphics to represent translation and rotation. These are the top two rows of a 3x3 matrix. The bottom row of the matrix is assumed to be \[0, 0, 1\]. This is known as an [affine transform](https://www.mathworks.com/discovery/affine-transformation.html) and is enough to represent translation, rotation, and skew.

The identity transform is `[[1, 0, 0], [0, 1, 0]]`.

A translation matrix will typically look like:

Translation matrix

```
[[1, 0, tx], [0, 1, ty]]
```

and a rotation matrix will typically look like:

Rotation matrix

```
[[cos(angle), sin(angle), 0], [-sin(angle), cos(angle), 0]]
```

Another way to think about this transform is as three vectors:

*   The x axis (t\[0\]\[0\], t\[1\]\[0\])
*   The y axis (t\[0\]\[1\], t\[1\]\[1\])
*   The translation offset (t\[0\]\[2\], t\[1\]\[2\])

[

Previous

TextEditEvent

](/docs/widgets/api/type-TextEditEvent/)[

Next

WidgetClickEvent

](/docs/widgets/api/type-WidgetClickEvent/)

---
