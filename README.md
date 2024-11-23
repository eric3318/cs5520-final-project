**CS5520 Final Project**<br>
Team members: Zhiyu Wu, Han Nie<br>
Data Model:<br>
3 collections: Appointments, Posts, Trainer<br>
**Appointments Fields**: userId, trainerId, trainerName, datetime<br>
CRUD operations: Create an appointment, Read user's appiontments, delete (cancel) appointments<br>
**Posts Fields**: userId, text, timestamp, likedBy, imageUri<br>
CRUD operations: Create a post, Read user's posts or Read all posts<br>
**Trainer Fields**: trainerId, name, focus, bookedTimeslots, availability, imageUri<br>
CRUD operations: read trainer's information<br>


**Contributions**<br>
Zhiyu:<br>
Zhiyu implemented the code for Appointment screen and Exercises screen. For Appointment screen, Zhiyu added cards for all trainers, showing their information and providing a "reserve" button. When the button is clicked, user would be directed to the Reserve screen developed by Zhiyu. In the Reserve screen, user can picked the available timeslots for the specific trainer in the calendar and made the appointment. Also, Zhiyu implemented filters in the Appointment screen.<br> 
![Screenshot 2024-11-13 231536](https://github.com/user-attachments/assets/e049bb9c-5765-4ba1-b429-554fe87bb8e4)
![Screenshot 2024-11-13 231624](https://github.com/user-attachments/assets/a50a429d-1c67-4337-bac0-9fd83cc7694d)


For exercises screen, Zhiyu implemented search bar (not functioning yet) for user to search specific videos. User can also clicked on specific cards for different categories (video not inserted yet) to browse the videos under the specific categories.<br> 
![Screenshot 2024-11-13 231646](https://github.com/user-attachments/assets/4d2371da-361d-44fd-9ca7-58f324dadb39)

Zhiyu also designed the UI for profile screen, and implemented the "View my appointments" screen for user to check their appointments. user can also cancel their appointments within the "View my appointments" screen.<br>
![Screenshot 2024-11-13 231857](https://github.com/user-attachments/assets/a9dab02e-1f89-46d3-8127-c814a141cbf1)

![Screenshot 2024-11-13 231716](https://github.com/user-attachments/assets/a45d191e-e7b2-4c55-bfc5-faf99bb1a704)

Han:<br> 
1. Built Auth screen and implemented user authentication functionalities including signup, login, and logout.
![img_4.png](img_4.png)
2. set up the firebase configuration and helper functions to perform CRUD operations on fireBase.
3. created the Discovery screen and New Post screen and implemented functionalities such as like/unlike and post making.
![img_1.png](img_1.png)
4. Implemented the Profile Details Screen, which is used commonly by the three options to conditionally render corresponding data.
![img_2.png](img_2.png)
![img_3.png](img_3.png)












