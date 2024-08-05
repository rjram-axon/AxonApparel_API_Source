CREATE TABLE [dbo].[StoreSection]
(
	[SectionId] INT NOT NULL PRIMARY KEY identity(1,1),
	[StoreunitId] int not null,
	[SectionName] nvarchar(30),	
	[Status] bit not null default 1,
	CONSTRAINT [FK_Storeunit] FOREIGN KEY ([StoreunitId]) REFERENCES [StoreUnit]([StoreunitId])
)
