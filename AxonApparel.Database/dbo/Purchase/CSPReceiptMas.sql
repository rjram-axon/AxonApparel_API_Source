CREATE TABLE [dbo].[CSPReceiptMas]
(
	[ReceiptID] [int] IDENTITY(1,1) NOT NULL primary key,
	[ReceiptNo] [varchar](20) NOT NULL,
	[ReceiptDate] [datetime] NULL,
	[RefNo] [varchar](25) NULL,
	[CompanyId] [int] NOT NULL,
	[Buyerid] [int] NOT NULL,
	[OrderNo] [varchar](20) NOT NULL,
	[Styleid] [int] NOT NULL,
	[Remarks] [varchar](250) NULL,
	[Automated] [char](1) NULL,
	[StoreUnitID] [int] NULL,

	CONSTRAINT [fk_cspreceiptmas_strunitid] FOREIGN KEY([StoreUnitID]) REFERENCES [dbo].[StoreUnit] ([StoreUnitID]),
	CONSTRAINT [fk_cspreceiptmas_buyerid] FOREIGN KEY([Buyerid]) REFERENCES [dbo].[buyer] ([buyerid]),
	CONSTRAINT [fk_cspreceiptmas_companyid] FOREIGN KEY([CompanyId]) REFERENCES [dbo].[company] ([companyid]),
	--CONSTRAINT [fk_cspreceiptmas_orderno] FOREIGN KEY([OrderNo]) REFERENCES [dbo].[buy_ord_mas] ([Order_No]),
	CONSTRAINT [fk_cspreceiptmas_styleid] FOREIGN KEY([Styleid]) REFERENCES [dbo].[styleheader] ([styleid])
)
