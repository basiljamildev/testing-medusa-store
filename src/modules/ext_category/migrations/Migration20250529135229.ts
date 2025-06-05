import { Migration } from '@mikro-orm/migrations';

export class Migration20250529135229 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "ext_category" ("id" text not null, "icon" text not null, "meta_title" text not null, "meta_description" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "ext_category_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_ext_category_deleted_at" ON "ext_category" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "ext_category" cascade;`);
  }

}
