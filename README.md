**CS5520 Final Project Iteration 3**<br>
Team members: Zhiyu Wu, Han Nie<br>
Data Model:<br>
4 collections: appointments, posts, trainers, users<br>
**Appointment fields**: userId, trainerId, trainerName, datetime<br>
CRUD operations: create an appointment, read user's appointments, delete appointments<br>
**Post Fields**: text, timestamp, likedBy, imageUri, user (uid, username, imageUri)<br>
CRUD operations: create a post, update post, delete post, read user's posts or read all posts<br>
**Trainer fields**: trainerId, name, focus, bookedTimeslots, availability, imageUri, latitude, longitude<br>
CRUD operations: read trainer information<br>
**User fields**: username, createdAt, imageUri <br>
CRUD operations: create user, read current user information<br>

1 sub-collection: post/comments <br>
**Comment fields**: text, user (uid, username, imageUri)
CRUD operations: create a comment, read all comments

**Contributions**<br>
Zhiyu:<br>
Zhiyu implemented the code for "TrainerMap" screen (accessed via "Locate Nearby Trainers" in Appointment screen) . For TrainerMap screen, Zhiyu added markers for user location, and added markers for all trainers. The markers' size would dynamically adjust based on the zoom level. Also, the trainers would be clustered when the map is in a high zoom level. When user clicks on the markers (avatars) of the trainers, there would be a modal showing information of the trainer and button to make an appointment with the trainer. If the user clicks "Reserve", he/she would enter the same reserve screen they would enter if they clicks "Reserve" in appointment screen.<br> 
<img width="319" alt="Screenshot 2024-11-23 at 6 23 40 PM" src="https://github.com/user-attachments/assets/5f127a11-ea41-47ed-809f-353aafa70c00">
<img width="319" alt="image" src="https://github.com/user-attachments/assets/28327aff-f2e5-4b94-a9d0-aad7b1b9797f">
<img width="319" alt="image" src="https://github.com/user-attachments/assets/01a2f50c-f9ea-4f60-a087-ec6d18d6f187">
<img width="319" alt="image" src="https://github.com/user-attachments/assets/19646b6a-6b03-4bd7-bce0-a76d1669a6ad">

Han:<br>
1. Implemented authentication by adding the Auth screen, using the React Context API for state management,
and building functionalities including user login, signup, password reset and logout. <br>
![img_7.png](img_7.png)<br>
![img_8.png](img_8.png)<br>
![img_9.png](img_9.png)<br>
2. Added authorization rules in firebase to achieve fine-grained access control.<br>
![img_10.png](img_10.png)<br>
3. Added a users collection in firestore to store additional information about the user,
including username, profile image URI and account creation time,
and displayed the information in user's profile.<br>
![img_11.png](img_11.png)<br>
4. Implemented post editing and deleting features.<br>
![img_12.png](img_12.png)<br>
5. Implemented the post comment feature and added the PostDetails screen, where all comments to the post are displayed.<br>
![img_13.png](img_13.png)<br>
![img_14.png](img_14.png)












