# React Search App

## Demo App

[Click Here](https://master.d2gmsl132ygn91.amplifyapp.com/)

The above link will redirect you to the App deployed on AWS. This link is also used in End-To-End testing.

## Getting Started

To clone the repository and run the app locally follow these steps:

```
git clone https://github.com/surajverma2587/react-search-app.git
cd react-search-app
npm install
npm run start
```

## Scripts

Build app by using the command below and serve it locally

```
npm run build
serve -s build
```

Start app locally

```
npm run start
```

Test with coverage report

```
npm run test
```

Test with watch during development

```
npm run test:dev
```

## Approach

Detailed planning of the component layout along with the respective class names and element types was performed initially to get a comprehensive overview of what was expected for the first feature. A whiteboard sketch was translated to a draw.io diagram as shown below:

![Component Wireframe](https://github.com/surajverma2587/react-search-app/blob/master/docs/01-Component-Wireframe.jpg "Component Wireframe")

A pure TDD approach on the development of the raw component without styling was carried out following the diagram above, with tests mainly asserting if the components with the css class names were being render as at this point there is no component logic or props in place.

Once this was complete, from the diagram the props that are required to render this component was clear and the next step was to incorporate props and update and add tests accordingly.

A full component styling was performed at this point and app was running locally to confirm if they visually appear are expected.

Back to the whiteboard to sketch out the component logic which resulted in 2 diagrams as shown below:

![Component Logic](https://github.com/surajverma2587/react-search-app/blob/master/docs/02-Component-Logic.jpg "Component Logic")

In the above diagram the assumption of some mock data was made during development to incorporate some states such as results and showResults which was controlled by events such as onFocus, onBlur and onChange.

![Component Logic Extended](https://github.com/surajverma2587/react-search-app/blob/master/docs/03-Component-Logic-Extended.jpg "Component Logic Extended")

At this point the mock data had to be replaced by the API data fetched by a given search term. In order to prevent an API call for every key press during the onChange event a custom hook to debounce the value was introduced with an assumption of a delay of 500ms, which can be further extended to accept any delay value. The custom hook useDebounce returns a search URL and the scheduled effect is triggered upon a change in the searchTerm. After the delay has lapsed the searchURL is updated with the latest searchTerm which was set during the callback function of the setTimeout function.

The searchURL is then passed to another custom hook to fecth the data, useFetchData hook. This hook is responsible for making the API request, axios used here, and setting the results which was initially mock data.

The two custom hooks, useDebounce and useFetchData, are used within a third custom hook which controls them called the useResults hook. This hooks returns the input events handler functions, the boolean to showResults, and the API results, which are required by the React function-based component to render. 

Tests were written for each custom hook and component tests become more like behaviour tests as the hooks logic was separated to files that can be reused. 

NOTE - One assumption made to populate the dropdown was to just return the name properties from the API data as I was unclear of the business rules around what City, Country was used for different types and in some cases the concatenation of the display names (Manchester Airport (MAN).

## Testing

- Unit tests were added during development using the TDD approach.
- Custom hooks were also individually tested to give confidence in reusing these hooks
- Component tests for various states and behaviour were also tested
- Lastly, end-to-end visual testing was performed using NightwatchJS

## Checklist

### Feature 1

To build the Search Widget component with the required HTML elements and the appropriate styling

#### Scenario-1
```
Given I am a visitor to the rentalcars.com homepage 
Then I should see a Search Widget 
And a text box labelled 'Pick-up Location' 
And the styling as per the rentalcars.com homepage
```

#### Scenario-2
```
Given I am on the Search box within the rentalcars.com homepage
Then I should see the placeholder text within the 'Pick Up Location' input box: 'city, airport, station, region and district...'
AND the styling is as per the rentalcars.com homepage
```

#### Scenario-3
```
Given I am on the Search box within the rentalcars.com homepage
When I click/tap into 'Pick Up Location' box 
Then a focus state is applied (browser default)
```

#### Scenario-4
```
Given I am on the Search box within the rentalcars.com homepage
When I use a screen reader
Then the correct criteria is read out for the 'Pick Up Location' box

```

#### Screenshots

![1](https://github.com/surajverma2587/react-search-app/blob/master/docs/screenshots/1.png "1")

### Feature 2

Incorporate component logic for various scenarios

#### Scenario-1
```
Given I am a visitor on the Search Box within the rentalcars.com homepage
When I enter a single alphanumeric character into the pick up location
Then the placeholder text disappears
AND no search results list is displayed
```

#### Scenario-2
```
Given I am a visitor on the Search Box within the rentalcars.com homepage
When I enter 2 or more alphanumeric characters into the pick up location 
Then I see a list of search results
```

#### Scenario-3
```
Given I have entered a matched search term for pick up location on desktop
Then the maximum number of search results displayed is 6
```

#### Scenario-4
```
Given I am a visitor on the Search Box within the rentalcars.com homepage
When I enter a search term in the pick up location that is not recognised eg XX
Then I should see the message 'No results found'
```

#### Scenario-5
```
Given the search results list is displayed 
When I remove the search term leaving only 1 character 
Then the search results list no longer displayed
```

#### Screenshots

![2](https://github.com/surajverma2587/react-search-app/blob/master/docs/screenshots/2.png "2")

![3](https://github.com/surajverma2587/react-search-app/blob/master/docs/screenshots/3.png "3")

![4](https://github.com/surajverma2587/react-search-app/blob/master/docs/screenshots/4.png "4")