# HR Recruitment Dashboard

## Overview

The HR Recruitment Dashboard is a web application designed to streamline the recruitment process for HR professionals. It provides a user-friendly interface for managing candidate information, job listings, and recruitment statistics.

## Features

- **Candidate Management**: CRUD operations for managing candidate information.
- **Job Management**: CRUD operations for managing job listings.
- **Recruitment Statistics**: Get insights into recruitment trends.

## API Documentation

The backend API is built using Express.js and MongoDB. Below are the available endpoints:

- **Candidates Endpoints**
- POST api/v1/candidate/create
- GET api/v1/candidate/candidates
- GET api/v1/candidate/shortlisted
- GET api/v1/candidate/getRejected
- PATCH api/v1/candidate/rejected/65f72e1c65fa58ccfcb7c35e
- GET api/v1/candidate/getByGender/MALE (Male/Female)
- PATCH api/v1/candidate/updateCandidate/65f72e1c65fa58ccfcb7c35e
- DELETE api/v1/candidate/deleteCandidate/65f72e1c65fa58ccfcb7c35e

- **Jobs Endpoints**
- POST api/v1/job/create
- GET api/v1/job/jobs
- GET api/v1/job/recentlyJobs
- GET api/v1/job/detailsJob/65f72e1c65fa58ccfcb7c35e
- PATCH api/v1/job/updateJob/65f72e1c65fa58ccfcb7c35e
- DELETE api/v1/job/deleteJob/65f72e1c65fa58ccfcb7c35e

## Technologies Used

- Express.js
- Mongoose
- MongoDB
- Node.js
