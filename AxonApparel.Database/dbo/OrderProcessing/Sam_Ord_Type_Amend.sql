CREATE TABLE [dbo].[Sam_Ord_Type_Amend]
(
	[RecId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[SamRecId] INT NOT NULL ,
	Buy_ord_masid int NULL,
	SamTypeId int NULL,
	SamTypeQty decimal(18,9) NULL

	--CONSTRAINT [FK_buy_ord_mas_buyermasid] FOREIGN KEY (Buy_ord_masid) REFERENCES Buy_Ord_Mas([Buy_Ord_MasId]),
)
