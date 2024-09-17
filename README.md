
# Bug Board

An full-stack **issue tracker** application with a **dashboard** displaying developer performance and issue status statistics. Integrated **Prisma ORM** with **PostgreSQL** for efficient database management and queries. Implemented **dynamic area charts using Recharts** for interactive data visualization of issue status over time. Created a responsive UI with **Shadcn UI components and Tailwind CSS**, offering seamless user experience across devices.


## Demo

https://bugboard.vercel.app


## Tech Stack

**Framework:** Next JS

**UI**: Tailwind CSS, Shadcn UI, Recharts

**Database:** Postgreql, Prisma

## Features

- Light/dark mode toggle
- Issue Table
- Interactive Data Visualization
- Stat according to issues and developers


## API Reference

#### Get all issues

```http
  GET /api/issues
```

#### Get issue

```http
  GET /api/issues/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Id of issue to fetch (**Required**)|

#### Update issue

```http
  POST /api/issues/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Id of issue to fetch (**Required**) |
| `title`      | `string` | Title of the issue (**Optional**) |
| `description`      | `string` | Description of issue (**Optional**) |
| `status`      | `string` | Status of issue (**Optional**) |
| `developerId`      | `string` | DeveloperId of issue (**Optional**) |


#### Add new issue

```http
  POST /api/issues/new
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Title of the issue (**Required**) |
| `description`      | `string` | Description of the issue (**Required** )|
| `developerId`      | `string` | DeveloperId if it is assigned (**Optional**)|

#### Get issues stat count

```http
  GET /api/issues/stat
```

#### Get issues stat count within a range

```http
  GET /api/issues/stat/range
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `min`      | `string` | Min Date to start fetching the issue (**Required**) |
| `description`      | `string` | Max Date to start fetching the issue (**Required** )|

#### Get all developers

```http
  GET /api/developers
```

#### Get all developers stat

```http
  GET /api/developers/stat
```
## Screenshots

Dashboard
![Dashboard](https://github.com/nishanthan-k/issue-tracker/blob/master/public/screenshots/Dashboard.png)

Issues
![Issues](https://github.com/nishanthan-k/issue-tracker/blob/master/public/screenshots/Issues.png)

Add New Issue
![Add New Issue](https://github.com/nishanthan-k/issue-tracker/blob/master/public/screenshots/NewIssue.png)

Update Issue
![Update Issue](https://github.com/nishanthan-k/issue-tracker/blob/master/public/screenshots/UpdateIssue.png)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` - an Postgresql DB
