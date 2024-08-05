CREATE TABLE [dbo].[CommunicationDoc]
(
	[EntryId] INT NOT NULL PRIMARY KEY,
	[DocTitle] [varchar](50) NOT NULL,
	[DocName] [varchar](50) NULL,
	CONSTRAINT [fk_CommDoc_Entryid] FOREIGN KEY([EntryId]) REFERENCES [dbo].[Communication] ([Id])
)
