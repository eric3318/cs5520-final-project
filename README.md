**CS5520 Final Project Iteration 2**<br>
Team members: Zhiyu Wu, Han Nie<br>
Data Model:<br>
3 collections: Appointments, Posts, Trainer<br>
**Appointments Fields**: userId, trainerId, trainerName, datetime<br>
CRUD operations: Create an appointment, Read user's appiontments, delete (cancel) appointments<br>
**Posts Fields**: userId, text, timestamp, likedBy, imageUri<br>
CRUD operations: Create a post, Read user's posts or Read all posts<br>
**Trainer Fields**: trainerId, name, focus, bookedTimeslots, availability, imageUri, latitude, longitude<br>
CRUD operations: read trainer's information<br>


**Contributions**<br>
Zhiyu:<br>
Zhiyu implemented the code for "TrainerMap" screen (accessed via "Locate Nearby Trainers" in Appointment screen) . For TrainerMap screen, Zhiyu added markers for user location, and added markers for all trainers. The markers' size would dynamically adjust based on the zoom level. Also, the trainers would be clustered when the map is in a high zoom level. When user clicks on the markers (avatars) of the trainers, there would be a modal showing information of the trainer and button to make an appointment with the trainer. If the user clicks "Reserve", he/she would enter the same reserve screen they would enter if they clicks "Reserve" in appointment screen.<br> 
<img width="319" alt="Screenshot 2024-11-23 at 6 23 40 PM" src="https://github.com/user-attachments/assets/5f127a11-ea41-47ed-809f-353aafa70c00">
<img width="319" alt="image" src="https://github.com/user-attachments/assets/28327aff-f2e5-4b94-a9d0-aad7b1b9797f">
<img width="319" alt="image" src="https://github.com/user-attachments/assets/01a2f50c-f9ea-4f60-a087-ec6d18d6f187">
<img width="319" alt="image" src="https://github.com/user-attachments/assets/19646b6a-6b03-4bd7-bce0-a76d1669a6ad">

Han:<br>
1. Implemented the ImageManager component to provide image using camera or selecting from media library.
![img_5.png](img_5.png) <br>
2. Implemented the NotificationManager component to schedule local notifications.
![img_6.png](img_6.png) <br>
3. Abstracted the code for authentication logic into authContext and a custom useAuth hook.













