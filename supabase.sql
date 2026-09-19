create table if not exists public.zeion_api(
 id text primary key,
 name text not null,
 code text not null,
 loader_code text,
 created_at bigint not null
);
alter table public.zeion_api enable row level security;
alter table public.zeion_api add column if not exists loader_code text;