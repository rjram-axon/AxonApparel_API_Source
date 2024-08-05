CREATE TABLE [dbo].[StyleTempMas]
(
	[TemplateId] [int] IDENTITY(1,1) NOT NULL,
	[Template] [varchar](60) NOT NULL,
	[BuyerId] [int] NOT NULL,
	[ItemId] [int] NOT NULL,

	CONSTRAINT [PK_StyleTemplateId] PRIMARY KEY ([TemplateId]),
	CONSTRAINT [FK_StyleTemplate_BuyerId] FOREIGN KEY ([BuyerId]) REFERENCES [Buyer]([BuyerId])	,
	CONSTRAINT [FK_StyleTemplate_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId])	,
)
