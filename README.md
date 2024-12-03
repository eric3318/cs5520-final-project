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
Zhiyu implemented the code for "Video" screen (accessed via exercise screen). For Video screen, Zhiyu added codes to make user able to navigate to video lists with specific category (fetched via Youtube API) via clicking on the category card on the exercise screen. Also, Zhiyu implemented the search function that when user typed in specific keyword, the screen with video lists that contain videos related to specific keywords will be shown. Also, when user clicked on the video of the video list, user would navigate to the video player screen where via webview user can indeed watch the video.<br> 
![image](https://github.com/user-attachments/assets/e151bd4f-807b-45c8-9df6-83635506a69c)
![image](https://github.com/user-attachments/assets/8ff366b9-a25f-4175-84d8-fdb58d06b9e9)


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












