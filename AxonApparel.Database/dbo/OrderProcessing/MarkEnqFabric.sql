CREATE TABLE [dbo].[MarkEnqFabric]
(
    [MarkEnqFabricId] [int] IDENTITY(1,1) NOT NULL,
	[EnquiryID] [int] NOT NULL,
	[FabricId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
	[SizeId] [int] NULL,
	[GSM] [int] NOT NULL,
	[Composition] [varchar](150) NULL,
	[FabDesc] [varchar](250) NOT NULL DEFAULT (''),
	[Counts] [varchar](100) NOT NULL DEFAULT (''), 
    CONSTRAINT [PK_MarkEnqFabric] PRIMARY KEY ([MarkEnqFabricId]),
	CONSTRAINT [FK_MarkEnqFabric_Color] FOREIGN KEY ([ColorId]) REFERENCES [Color]([ColorId]),
	CONSTRAINT [FK_MarkEnqFabric_MarkEnqMas] FOREIGN KEY ([EnquiryID]) REFERENCES [MarkEnqMas]([EnquiryID]),
    CONSTRAINT [FK_MarkEnqFabric_Item] FOREIGN KEY ([FabricId]) REFERENCES [Item]([ItemID]),
	CONSTRAINT [FK_MarkEnqFabric_Size] FOREIGN KEY ([SizeId]) REFERENCES [Size]([SizeID])
	
)
