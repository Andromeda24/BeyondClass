# Beyond Class

Beyond Class is an agentic AI application designed to help K–12 schools manage extracurricular activities with greater efficiency, consistency, and adaptability. The system uses natural language processing, semantic search, and modular agentic workflows to streamline activity exploration, enrollment, rostering, attendance, communication, and reporting.

## Pipeline

```mermaid
flowchart TD

%% ============================
%% Swimlanes (vertical layout)
%% ============================

subgraph School
A[Provide activity catalog]
end

subgraph Beyond Class Activity Explorer
B[Prepare activity information]
C[Show activity explorer]
D[Display relevant activities]
end

subgraph Parent
E[Choose an activity]
end

subgraph Beyond Class Enrollment Agent
F[Apply school rules and conflict validations]
G[Enrollment is created]
H[Enrollment is blocked]
I[Optional: Store billing information]
J[Optional: Send email notifications]
K[Other optional steps]
end

subgraph Beyond Class Rostering System
L[Rostering]
Z[Additional data]
end

subgraph Teacher
M[Get rostering]
end

subgraph School Staff
N[Get reports]
O[Analytic dashboards]
end

%% ============================
%% Flow (vertical)
%% ============================

A --> B --> C --> D --> E --> F
F -->|Rules allow| G
F -->|Rules prevent| H
F --> I
F --> J
F --> K
G --> L
L --> M
L --> N
Z --> N
L --> O
Z --> O


```



flowchart TD

    %% Client Layer
    A[Browser\nParent URL / Role-based URL] --> B[Nginx Reverse Proxy]

    %% Nginx Routing
    B -->|"/"| C[Frontend\nReact + Vite + i18n]
    B -->|"/api/*"| D[Backend\nFastAPI (Python)]

    %% Backend Connections
    D --> E[MongoDB\nUsers + Students]
    D --> F[OpenAI API]

    %% Notes
    C -->|Fetch languages, users, students| D


Deployment Diagram

flowchart TB

    %% Deployment Nodes
    subgraph Client_Device[Client Device]
        Browser[Web Browser]
    end

    subgraph Server_Host[Server Host / VM / Container Host]
        subgraph Nginx_Container[Nginx Container]
            Nginx[Nginx Reverse Proxy]
        end

        subgraph Frontend_Container[Frontend Container]
            FE[React Application\n(Vite Build)]
        end

        subgraph Backend_Container[Backend Container]
            BE[FastAPI Backend\n(Python)]
        end

        subgraph Mongo_Container[MongoDB Container]
            DB[(MongoDB\nUsers + Students)]
        end
    end

    subgraph External_Services[External Services]
        OpenAI[OpenAI API]
    end

    %% Connections
    Browser -->|HTTP :80| Nginx
    Nginx -->|Route "/"| FE
    Nginx -->|Route "/api/*"| BE
    BE -->|Database Queries| DB
    BE -->|API Calls| OpenAI


## Run the server 

<RootFolder>/backend 
