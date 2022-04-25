# General notes by the developer (me :D)

1. Since the project is pre-built with some Typescript features and I stated I preferred to work with Javascript instead, I had to do some workarounds to make everything work; namely add some //@ts-nocheck, re-install Cypress to work well with just JS, and in general play around with config files. Maybe I did some changes that weren't necessary for JS to work or maybe I didn't do it in the right way, but in the end my time was limited so I went for the options that "just worked".
2. I thought relevant to mention that I chose to go with rendering the table as a `table` element instead of using `ul`/`ol` & `li` structure. I think semantically it makes more sense, it's less painful to style from scratch, but it comes at the cost that the table isn't completely responsive and goes out of the screen in small window/screen sizes. With more time this is easy to fix.
3. The project itself wasn't too complex so I decided to separate code into different folders & files just for better readability and scalability, even if for a project this small it's definitely an overkill. 
4. Pretty much all tests are done with Cypress. I did a very silly test with React Testing Library to verify it worked but I'm more comfortable with Cypress and I had to prioritize.
5. Server-side code wouldn't work without applying Cors library so that's what I did :D

## Answers to questions posed by the development team (you :D)

### What was your overall impression of the coding test?
I liked the test. I think it was simple enough that I can spend the majority of time thinking about higher-level stuff instead of outputting a lot of code before the deadline. How to structure the project for scalability, how to setup testing, expected user interaction, code style... these are examples of stuff I spent quite some time thinking about so I could deliver project as clean as possible.

However, although I appreciate the effort to setup an initial boilerplate for the project, I think it was designed as a boilerplate for Typescript, so in my case of using just Javascript I think that boilerplate caused more issues than it helped.

### Did you find the coding test challenging? If so, which part/s?
As I said, not really. I was asked a very standard set of things. The most difficult part was to actually make it work at the beginning because of Typescript getting in my way.

### Were the instructions clear to follow? If not, what wasn’t clear?
I think the Figma had some loose ends in the sense that I wasn't 100% sure about some details (do I have to put a wrapper here? is this actually a column, or three, or how many? etc).

Also, I saw no mention about the WebSockets at all in the project description.

Last, I didn't exactly understand what all the data means. In the Figma I see some scores with green colour, others with parenthesis values. The WebSocket messages are just an initial value for the scores that increments by 1 every 3 seconds, and I assumed I should be doing nothing more than rendering these updates, but again I wasn't 100% sure of this. Were the `series` values not getting updated?

### How long did it take you to solve the coding test?
About 6 hours in total.

# Grid Frontend Coding Test

# Requirements

Please do the following tasks in order

- Retrieve the data from the static series endpoint, and output this into a table or list
- Add in the ability to be able to filter this table/list by title along with a text filter for tournament name
- Use whatever your feel comfortable to style the table/list following the design below

## Table Designs
- https://www.figma.com/file/CoIVwq0YUHfHnTvnUTpiAS/Interview-Design

## Getting started

In the project directory, you can run:

### `yarn server`

Runs the mock server to be able to get fixtures via a http request available endpoints are;
- http://localhost:3001/series

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
