# AlcheBlog

### A Blog Website to host and record tech-writting competitions. 


[See Demo Website](https://alche-blog.vercel.app)

## Table of contents
* About
* Outlook
* Contact


## About The Project

AlcheBlog is project dedicated to the [Alchemy University](https://twitter.com/AlchemyLearn), which regularily hosts competitions for writting technical articles about a certain Web3 related topic. It consits of two main components: 1) Support the moderators with the hosting and recording Challenges, and 2) Support the writters by offering a publicly viewable platform for their articles. 

Because processes and solutions for both aspects already exsist, AlcheBlog aims to be a integratible solution. This means minimizing the friction between using AlcheBlog vs. a currently used solution. And because the service should be for free, all functionalities must work using free tiers. 

Currenlty AlcheBlog is a statically generated site. New articles and Challenges can only be submitted by individuals with access to the github repository. Moderators can update the Blogs content by creating and adding a markdown file representing a challenge or submission. This solution offers a simple and cost free way to record the challenges. A new Challenge can be added to the AlcheBlog in just a few minutes, by copy and pasting the information posted on discord into a markdown file and committing the changed code. Analog, submitted articles can be added and usinfg the frontmatter linked to challenges and the authors. AlcheBlog updates everything else automatically. 
With this set-up AlcheBlog can be used by the moderators to publicly record past, current and upcoming Challenges. 


## Outlook - Next to come 

### User Authentication
With discord being the primary platform, users will be able to sign up using their Discord. At this point AlcheBlog will use nextjs to authenticate the user and change the viewable content depending on the current state of the session. 

### User Submission
Until this point AlcheBlog is running serverless, making use of nextjs. In order to manage the interactions of participants such as votes and links to Challenge submissions a database is required. 

### User Accounts
The last step is to automate the process of uploading articles to the AlcheBlog. The main issue here is to find enough cost-free storage for all articles. While free tier are sufficient to store simple user submissions in form of votes are links, entire articles will require a more creative solution. 

### Token Gating
With Alchemy University targeting Web3, a Token Gated access seems to be appropriate. In this step the authentication process via discord will be replaced with a authentication via the already existing Alchemy University NFT. 


## Acknowledgments

This project is used components from these tutorials: 
   - [Link](https://www.youtube.com/watch?v=HYv55DhgTuA)
   - [Link](https://www.youtube.com/watch?v=0aPLk2e2Z3g)
   - [Link](https://www.youtube.com/watch?v=9rCXE-mcO7Q)



## Contact

Twitter - [@adkirf](https://twitter.com/adkirf)

Project Link: [Adkirf Portfolio](https://portfolio-v2-nu-ivory.vercel.app/)

If you have any suggestions that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!
