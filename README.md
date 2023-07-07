# How to install/run app
- use pip to install libretranslate
- run libretranslate by running `libretranslate` in the command line
- go to `aview-challenge/dist/index.html` and open the html file. This is the app.

Alternatively, you can use `node` and do `npm install` and then `npm run dev` if you want to run it via dev mode.

# Approach
My approach to this challenge was to make the design as simple as possible since the requirements themselves were simple as well.
This is why we only have one component "App" and that we didn't split the page into multiple components. It makes the code simpler in that
we don't have code existing in multiple files but it also makes the one App component bigger and also responsible for more things which in turn
breaks single responsibility principle. However, even though we are breaking the principle, the App component is still less than 70 lines of code,
so I thought it was reasonable to leave it at that instead of breaking it up and creating lots of very small components.

Another reason why I left everything in one App component is that my submission only really has 5 elements. They are the 2 buttons to get a joke and to translate,
as well as 2 header elements to display the joke and the translated joke, as well as the scroll/select item to select the language. I didn't think it was worth it to split these 5 pieces into 5 components because each of these pieces are very simple and straight forward, and making them into separate components may have involved moving state around them which I don't think would have been worth it given adding them into one component still makes a small component.




