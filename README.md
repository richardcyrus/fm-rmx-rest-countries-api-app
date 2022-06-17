# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

To integrate with the [REST Countries API](https://restcountries.com/) to pull country data and display it like in the reference designs.

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

### Screenshot

![Reference preview](./__docs/design/reference/desktop-preview.jpg)

#### Reference images

- [Desktop Home Light](./__docs/design/reference/desktop-design-home-light.jpg)
- [Desktop Home Dark](./__docs/design/reference/desktop-design-home-dark.jpg)
- [Desktop Detail Light](./__docs/design/reference/desktop-design-detail-light.jpg)
- [Desktop Detail Dark](./__docs/design/reference/desktop-design-detail-dark.jpg)
- [Mobile Home Light](./__docs/design/reference/mobile-design-home-light.jpg)
- [Mobile Home Dark](./__docs/design/reference/mobile-design-home-dark.jpg)
- [Mobile Detail Light](./__docs/design/reference/mobile-design-detail-light.jpg)
- [Mobile Detail Dark](./__docs/design/reference/mobile-design-detail-dark.jpg)

### Links

- [Repository](https://github.com/richardcyrus/fm-rmx-rest-countries-api-app)
- [Live Site](https://fm-rmx-rest-countries-api-app.vercel.app/)

## My process

### Built with

- CSS custom properties
- CSS Grid
- Flexbox
- Mobile-first workflow
- Semantic HTML5 markup
- [Heroicons](https://heroicons.com)
- [Reach UI](https://reach.tech/)
- [Remix](https://remix.run/) - a full stack web framework.
- [React](https://reactjs.org/) - JS library.
- [Vitest](https://vitest.dev) - A blazing fast unit-test framework powered by Vite.
- [Testing Library](https://testing-library.com) - Simple and complete testing utilities that encourage good testing practices.
- [Mock Service Worker (msw)](https://mswjs.io/)

### What I learned

- When using the @reach/listbox, turn off the portal option when configuring the popover. It makes styling and behavior predictable and simple.

### Useful resources

- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [A Modern CSS Reset](https://piccalil.li/blog/a-modern-css-reset/)
- [Configuring Mock Service Worker](https://www.danieljcafonso.com/configuring_msw)
- [Debounce with Remix useSubmit hook](https://discord.com/channels/770287896669978684/770287896669978687/981676677102985306)
- [Guide to Advanced CSS Selectors - Part One](https://moderncss.dev/guide-to-advanced-css-selectors-part-one/#attribute-selector)
- [Handling Nested HTTP Requests Using the Fetch API](https://www.pluralsight.com/guides/handling-nested-http-requests-using-the-fetch-api)
- [How to filter out json object from array in javascript](https://stackoverflow.com/questions/67221312/how-to-filter-out-json-object-from-array-in-javascript)
- [Javascript Slugify](https://gist.github.com/mathewbyrne/1280286)
- [Make includes() case insensitive in JavaScript](https://bobbyhadz.com/blog/javascript-includes-case-insensitive)
- [Mocking REST APIs With MSW](https://frontend-digest.com/mocking-rest-apis-with-msw-af2353012daa)
- [Mocking an API request with Mock Service Worker and Typescript](https://codybontecou.com/mocking-api-with-msw-and-typescript.html#mocking-medium-s-api)
- [Mocking local dev and tests with msw + @mswjs/data](https://dev.to/jericopingul/react-local-development-and-testing-mocking-with-msw-and-mswjsdata-obl)
- [Remix + MSW](https://github.com/remix-run/remix/tree/main/examples/msw)
- [The Complete Guide to Dark Mode with Remix](https://www.mattstobbs.com/remix-dark-mode/)
- [Using Storybook and Mock Service Worker for mocked API responses](https://blog.logrocket.com/using-storybook-and-mock-service-worker-for-mocked-api-responses/)
- [What Is the Correct TypeScript Return Type for JavaScript's setTimeout() Function?](https://www.designcise.com/web/tutorial/what-is-the-correct-typescript-return-type-for-javascripts-settimeout-function)
- [find and filter arrays in JavaScript and Node.js](https://simonjcarr.medium.com/find-and-filter-arrays-in-javascript-and-node-js-9c4abac65c52)
- [using async await and .then together](https://stackoverflow.com/questions/55019621/using-async-await-and-then-together)
- [Dynamic tests from fetched data](https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__dynamic-tests-from-api)

## Author

- Website - [www.richardcyrus.com](https://www.richardcyrus.com)
- Frontend Mentor - [@richardcyrus](https://www.frontendmentor.io/profile/richardcyrus)
