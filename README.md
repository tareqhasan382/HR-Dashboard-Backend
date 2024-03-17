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
- GET /candidate/candidates
- GET /candidate/shortlisted
- GET /candidate/getRejected
- PATCH /candidate/rejected/65f72e1c65fa58ccfcb7c35e
- GET /candidate/getByGender/MALE (Male/Female)
- PATCH /candidate/updateCandidate/65f72e1c65fa58ccfcb7c35e
- DELETE /candidate/deleteCandidate/65f72e1c65fa58ccfcb7c35e

- **Jobs Endpoints**
- POST /job/create
- GET /job/jobs
- GET /job/recentlyJobs
- GET /job/detailsJob/65f72e1c65fa58ccfcb7c35e
- PATCH /job/updateJob/65f72e1c65fa58ccfcb7c35e
- DELETE /job/deleteJob/65f72e1c65fa58ccfcb7c35e

## Technologies Used

- Express.js
- Mongoose
- MongoDB
- Node.js
