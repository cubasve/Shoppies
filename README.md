# The Shoppies
### Movie Awards for Entrepreneurs

## Description:
Shopify has branched out into movie award shows. Build an application to help manage Shopify's movie nomination for the upcoming Shoppies.

The application should:
- Display results from OMDB's API (only show movies)
- The search results should display the movie's title and year, and have a nominate button
- The search results update when the search input updates
- Movies can be added and removed from the nomination list
- If a movie has been nominated, its nominate button should be disabled (so it doesn't get nominated twice)
- There can only be a maximum of 5 nominations. Once there are 5, show a banner indicating the limit.

## Screenshots of Application: 
![image](https://user-images.githubusercontent.com/62129720/117400720-370e1600-aed1-11eb-8059-b25b87e29426.png)

![image](https://user-images.githubusercontent.com/62129720/117400690-2cec1780-aed1-11eb-9353-5698356cd305.png)

![image](https://user-images.githubusercontent.com/62129720/117400743-41c8ab00-aed1-11eb-9489-fd467513e9d5.png)

<!-- ![image]() -->

<!-- ![image]() -->

## Technologies Used:
- OMDB (Open Movie Database) API
- React
- React-Bootstrap

## Getting Started:
- Demo: https://the-shopppies.netlify.app/

## Next Steps: Planned Future Enhancements
- **Save the nominations:**
    -  Currently, if the page is refreshed or if the user leaves the page, all the nominations are erased.
    - Save the nominations to local storage and/or session storage.

- **Add a loading icon:**
    -  This will indicate to the user when the search is done. 

- **Use toasts for notifications:**
    - If an error occurs (ex. add/delete nominations), tell the user by using a toast
