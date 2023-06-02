# Animal Adoption Management System - Frontend Application
  
####  For the backend, please visit [this](https://github.com/timigyurina/Animal_Adoption_Management_System_Backend) Githob repository.  
 
#### *Please note that this is an ongoing pet project of mine, continuously growing and evolving and may not yet have all pages and features fully implemented*

## About 
The current application is the frontend of my pet project, that aims to provide a centralised way to store and manage the adoption flow of animals living in shelters.
Visitors of the application are able to use some of its features without registering, but the main functionalities can only be accessed by registered and logged-in users. These are further restricted by the type of the user who wants to access them. At this point, these types are Adopters, ShelterEmployees and Administrators.  
**Adopters** are regular users who can register at any time and mainly use the application for browsing among shelters, animalbreeds, adoptable animals, viewing their images or filling in adoption applications to become possible adopters of an animal. They have a private menu where they can view their donations, adoption applications and contracts, and view or update their personal information.   
**ShelterEmployees** are specific users who work at the shelters registered in the system and are responsible for managing the animals of the shelter where they are employed. This involves not only adding new animals, updating their data or uploading images of them, but also managing (accepting or rejecting) adoption applications submitted by adopters, resulting in the possible creation of adoption contracts. ShelterEmployees have also a special menu pointing at all the information belonging to the shelter of their employment (its animals, donations and other information) and also to the adoption contracts and images uploaded by them. Apart from these special menu items only for employees, ShelterEmployees are also regular users with the abilitiy to browse among and adopt animals from shelters.  
**Administrators** have the ability to view (and in some cases create or modify) all information about not only all the animals, shelters and animalbreeds, but also all the donations, adoption applications and contracts in the system. They are superusers, who can also manage all the other users in the system (Adopters and ShelterEmployees) and also have the privilege to register a new user as an employee or as an administrator.  

All roots and components are designed to provide an easy-to-understand user interface for this complex system and to help in enhancing the speed of the whole adoption process.


## Main features and technologies
- React frontend with routing (react-router)
- Authentication and authorization (managed with React's Context API): registering, logging in and having access/ability to view pages and components based on cookies received from the backend 
- Custom authentication hook
- Custom fetch hook with loading and error states
- Custom theming with the basis of Material UI's theme context
- Pagination
- Image uploading
- Nice and clean UI made with the help of Material UI components
  
    
## Disclaimer
The idea of this project and the particular details are completely mine, any resemblance to an existing API or software is purely coincidental.  

  