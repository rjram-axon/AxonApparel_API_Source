CREATE TABLE [dbo].[Prefix]
(
[DocID] [int] IDENTITY(1,1) Primary key NOT NULL ,
[Document_Name] [varchar](40) NULL UNIQUE,
[Prefix] [char](3)  CONSTRAINT ck_prefix_prefix check (([prefix] like '[A-Z][A-Z][A-Z]')) NOT NULL
)
