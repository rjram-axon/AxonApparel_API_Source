CREATE TABLE [dbo].Ord_styleTempMas
(
	[TemplateId] [int] IDENTITY(1,1) NOT NULL,
	[Ord_MasId] [int] NOT NULL,
	[Order_No][varchar](20) not null,
	[style_ID] [int] NOT NULL,
	[Style][varchar](40) not null,
	[GItemId] [int]  NOT NULL,
	[GItem][varchar](500) not null,	
	[BuyerId] [int] NOT NULL,
	[Buyer] [varchar](90) NOT NULL,	
	[Template] [varchar](60) NOT NULL,
	

	CONSTRAINT [PK_Ord_ID] PRIMARY KEY ([TemplateId]),
	CONSTRAINT [FK_Ord_styleTempMas_Ord_MasId] FOREIGN KEY ([Ord_MasId]) REFERENCES Buy_Ord_Mas([Buy_Ord_MasId]),	
	CONSTRAINT [FK_Ord_styleTempMas_style_ID] FOREIGN KEY ([style_ID]) REFERENCES StyleHeader([StyleId]),	
	CONSTRAINT [FK_Ord_styleTempMas_GItemId] FOREIGN KEY ([GItemId]) REFERENCES Item ([ItemId]),	
	CONSTRAINT [FK_Ord_styleTempMas_BuyerId] FOREIGN KEY ([BuyerId]) REFERENCES Buyer([BuyerId])	
	
)


