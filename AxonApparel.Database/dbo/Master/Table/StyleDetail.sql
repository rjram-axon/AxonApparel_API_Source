CREATE TABLE [dbo].[StyleDetail]
(
	[Id] INT IDENTITY(1,1) NOT NULL, 
    [StyleId] INT NOT NULL, 
    [ItemId] INT NOT NULL, 
    [Qty] INT NOT NULL
	CONSTRAINT [FK_StyleRefId] FOREIGN KEY ([StyleId]) REFERENCES [StyleHeader]([StyleId]), 
	CONSTRAINT [FK_StyleRefItem] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
    CONSTRAINT [PK_StyleDetail] PRIMARY KEY ([Id])
)
