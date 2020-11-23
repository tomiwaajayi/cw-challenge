# cowrywise-test

> This application is a mini clone of unsplash.com and it was done as an assessment for a frontend developer role.
The application was developed in Vue.js

<p align="center">
  <br>
  <img src="https://res.cloudinary.com/dafsch2zs/image/upload/v1606077231/Screenshot_2020-11-22_at_21.32.01_lozflx.png" width="600" />
  <br>
  <caption>Screenshot of the landing page</caption>
  <br>
</p>

## Build Setup

``` bash
# install dependencies
yarn install

# Compiles and hot-reloads for development
yarn serve

# Compiles and minifies for production
yarn build

# Lints and fixes files
yarn lint

```

## Application Overview
- The basic idea of the app is to fetch images from the unsplash.com API and display them in a grid.
### App Breakdown
The following are the main components that make up the application  
  ##### 1. A search component (SearchSection.vue) 
  ##### 2. An image display component (ImageGrid.vue)
  - The API request is made on form submit in the Search component which is triggered both by the 'submit.enter' and 'input' events. The search function triggered on 'input' is debounced by the dependency "lodash.debounce" and it gets back an array of the image data. This data is then sent to the image display component. The loading state is also communicated to the "Image-grid component" from the "search component" to display skeleton loaders while the loading status is true.
  
  ##### 3. The skeleton loader (SkeletonLoader.vue)
 - It's the component rendered to the grid view when images are being fetched. It's imported directly in the ImageGrid.vue component.
It's a component without any functionality. It's works as a loader and the loading effect is done using css animations.

##### 4. The modal component (ImageModal.vue)
- It's the modal component that pops up when an image in the grid is clicked. It's shows the image at maximum resolution alongside the author and the location. It can be toggled off (closed) by clicking anywhere on the screen.
This component is directly imported into the ImageGrid.vue component. When an image on the grid is clicked, it passes it's ID into the function that triggers the modal and it's this information that the modal uses to get the image, author and location specific to the image clicked.

#### 5. The component for lazy loading Images (ImageItem.vue)
- This is the component that recieves the url and alt-text of the image to be loaded as props and lazyloads the images with the "lazy-load" directive.

#### 6. (ImageSpinner.vue)
- This component contains the ripple loading animation showing when images are being lazy loaded.

### Dependencies
  1. Axios - the http client used in this application.
  2. lodash.debounce - the dependency responsible for debouncing searching on "input" event. I added only the debounce package from lodash as importing the whole lodash dependency would be very unncessary and add bloat to the app.
  


### Things to note
1. Some images don't have locations returned from the API and for such images, I use "Somewhere on earth" as the location when rendering the views
2. The images displayed on the grid are given some contrast using css filter for accessibility reasons, so that the text would be easy to read. However, on hover the filter is removed and on click the images opens in a modal at full resolution.
3.There is a lazy-load fuction in the directives folder which sets up the "lazy-load" directive to be used in the ImageItem.vue component. The directive is declared globally in the main.js file.
4. There is an "event-bus" file (EventBus.js) is in the services folder. I decided to use an "event-bus" since only two sibling components were communicating and it seemed quite overkill to have used Vuex.
5. Also in the services folder, the unsplash.js file is where I have defined my GET function for searching images based on the search parameter. The function is then imported into the SearchSection.vue component.
6. On app load, images are fecthed from the API with "African" as the search query and "latest" as the search filter. After app load, all images searched are filtered by "most relevant".
7. Images only load when they are visible in the viewport. (this is handled by the "lazy-load" directive)
7. PRETTY MUCH ALL EDGE CASES ARE TAKEN CARE OF :)

