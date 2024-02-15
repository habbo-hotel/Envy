# Envy
Envy is a collection of microservices designed to make building scalable and high performance MMOs effortless 


## Credits
LeChris

## Requirements
Envy is only compatible with unix environments.
*If you are on Windows, you have to use a linux environment such as Ubuntu or Debian within WSL.*

## Getting Started
1. Install dependencies `pnpm install`
2. Copy the environment settings for each service `pnpm run dev:prep`
3. Modify the `.env`for all services
4. Start services locally `pnpm run dev:start`

## Goals
- Provide a distributed architecture that can scale to millions of users
- Provide common types and libraries for the FE and BE
- Provide an external GraphQL API for CMS implementations over HTTP2
- Provide an external WebSocket API for CMS and Plugin implementations to receive real-time updates
- Provide an internal NATS API for microservice communication
- Ensure all code follows true separation of concerns
- Ensure the database can be distributed
- Provide the minimum necessary to start creating your implementation for your preferred revision and connection type (e.g., Nitro, Flashplayer, Shockwave)
- Accomplish the above without making opinionated decisions on how the end-user connects or interacts
- Scale Up will provide its events and API calls that you can implement into your business logic associated with a packet structure or WebSocket events
- Provide an example using Nitro

## Tech Stack
- NodeJS
- TypeScript 
- NestJS 
- React 
- Postgres
- HTTP2
- NATS
- REDIS
- Bull
- Vite
- Turbopack
- NX
- PM2

## Status
This is a work in progress and no where near completion.