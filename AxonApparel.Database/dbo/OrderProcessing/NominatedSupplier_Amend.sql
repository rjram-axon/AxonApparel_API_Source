CREATE TABLE [dbo].[NominatedSupplier_Amend]
(
	[NomSupAmndId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NomSupId] [int] null,
	[Order_no] [varchar](20) NULL,
	[Supplierid] [int] NOT NULL,
	[Itemid] [int] NULL,
	[ORDERTYPE] [char](1) NULL, 
    CONSTRAINT [FK_NominatedSupplier_am_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
	 CONSTRAINT [FK_NominatedSupplier_am_Supplier] FOREIGN KEY ([Supplierid]) REFERENCES [Supplier]([SupplierId]), 
    --CONSTRAINT [PK_NominatedSupplier_am] FOREIGN KEY ([NomSupId]) REFERENCES [NominatedSupplier]([NomSupId])
)
