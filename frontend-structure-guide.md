
# 🧱 Frontend Structure Guide (Next.js)

This guide defines the architectural pattern used in this project to separate **data fetching**, **logic**, and **presentation**, while leveraging Next.js App Router and server components.

---

## ✅ Folder and File Convention Pages

```
Example 
/app/tasks/[project_id]/
  ├── page.tsx              // Server component page
  ├── layout.tsx            // Optional route layout
  ├── _components/           // Pure Local UI components (no logic)
  │   └── task-list.tsx
  ├── containers/           // Client-side components with state/logic
  │   └── task-list-container.tsx
  ├── lib/                  // Server-only data fetching functions
  │   └── get-tasks.ts
  └── actions/              // Server actions for mutations
      └── update-task.ts
```

**File Naming Convention**
- Use **lowercase** and **kebab-case** for filenames (e.g., `task-list.tsx`)
- Use **camelCase** for all exported identifiers (e.g., `export function taskListContainer`)

---

## 📂 Folder Roles

### `_components/`

- **Pure display components** (local only)
- Stateless, reusable, no data fetching or side effects

```tsx
// _components/task-list.tsx
export function TaskList({ tasks }) {
  return <ul>{tasks.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
}
```

---

### `containers/`

- Client components that manage hooks and state
- Compose logic and presentation

```tsx
// containers/task-list-container.tsx
'use client';

import { TaskList } from '../_components/task-list';
import { useOptimisticTasks } from '../hooks/useOptimisticTasks';

export function TaskListContainer({ initialTasks }) {
  const { tasks, updateTask } = useOptimisticTasks(initialTasks);
  return <TaskList tasks={tasks} />;
}
```

---

### `lib/`

- **Server-side data fetching** only
- Used in `page.tsx` and server components

```ts
// lib/get-tasks.ts
import { createServerClient } from '~/utils/supabase/server';

export async function getTasks(projectId: string) {
  const supabase = createServerClient();
  const { data } = await supabase.from('tasks').select('*').eq('project_id', projectId);
  return data;
}
```

---

### `actions/`

- Server actions used for form submits or direct updates
- Tagged with `'use server'`

```ts
// actions/update-task.ts
'use server';

import { createServerClient } from '~/utils/supabase/server';

export async function updateTask({ task_id, status }) {
  const supabase = createServerClient();
  return supabase.from('tasks').update({ status }).eq('id', task_id);
}
```

---

### `page.tsx`

- Server-rendered entry point for each route
- Fetches data from `lib/` and passes to display/logic layers

```tsx
// page.tsx
import { getTasks } from './lib/get-tasks';
import { TaskList } from './_components/task-list';

export default async function TasksPage({ params }) {
  const tasks = await getTasks(params.project_id);
  return <TaskList tasks={tasks} />;
}
```

---

## 🧠 Summary

| Layer     | Location       | Responsibility                        |
|-----------|----------------|----------------------------------------|
| Display   | `_components/` | Presentational only                   |
| Logic     | `containers/`  | Hooks, events, optimistic updates     |
| Fetching  | `lib/`         | Server-only data fetching             |
| Mutation  | `actions/`     | Server-only actions with side effects |
| Page Load | `page.tsx`     | Composes the route with fetched data  |

---

Following this separation makes the frontend:

- Easier to test
- More reusable
- Optimized for Next.js server-first rendering
