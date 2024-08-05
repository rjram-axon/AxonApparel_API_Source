CREATE TABLE [dbo].[NominatedSupplier]
(	
	[NomSupId] [int] IDENTITY(1,1) NOT NULL,
	[Order_no] [varchar](20) NULL,
	[Supplierid] [int] NOT NULL,
	[Itemid] [int] NULL,
	[ORDERTYPE] [char](1) NULL, 
    CONSTRAINT [FK_NominatedSupplier_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
	 CONSTRAINT [FK_NominatedSupplier_Supplier] FOREIGN KEY ([Supplierid]) REFERENCES [Supplier]([SupplierId]), 
    CONSTRAINT [PK_NominatedSupplier] PRIMARY KEY ([NomSupId])
)
