CREATE TABLE [dbo].[Process_Quote]
(
	[Process_Quoteid] [int] IDENTITY(1,1) NOT NULL, 
	[Process_QuoteNo] [varchar](20) NULL,
	[Process_QuoteDate] [datetime] NULL,
	[RefNo] [varchar](50) NULL,
	[RefDate] [datetime] NULL,
	[Processorid] [int] NULL,
	[BuyOrdGeneral] [varchar](1) NULL,
	[Buy_ord_no] [varchar](20) NULL,
	[Remarks] [varchar](1000) NULL,
	[Commit_Cancel] [varchar](1) NULL DEFAULT ('N'),
	[companyid] [int] NULL,
    CONSTRAINT [PK_Process_Quote] PRIMARY KEY ([Process_Quoteid]), 
    CONSTRAINT [FK_Process_Quote_Supplier] FOREIGN KEY ([Processorid]) REFERENCES [Supplier]([supplierid]), 
    CONSTRAINT [CK_Process_Quote_Column] CHECK ([buyordgeneral] = 'B' or [buyordgeneral] = 'G')
)
