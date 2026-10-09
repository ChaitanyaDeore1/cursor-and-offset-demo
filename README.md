# Offset vs Cursor pagination

A tiny feed demo showing why you sometimes see the same post twice while scrolling.

- Offset pagination: "skip 5 positions, give me 5". It repeats a post when new data arrives.
- Cursor pagination: "give me 5 posts older than the last one I saw". It doesn't repeat.

## Run it

```bash
npm install
node server.js
```

Open http://localhost:3000 and follow the three steps: open the feed, someone posts, scroll for more. Use the two tabs to compare OFFSET and CURSOR.

## Endpoints

- `/offset?page=2`
- `/cursor?after=16`
- `/add` adds a new post at the top
- `/reset` restores the first 20 posts

Stack: Node.js, Express, plain HTML/CSS/JS. Data is in memory, no database.
