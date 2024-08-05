CREATE TABLE [dbo].[Job_Inv_Det]
(
	[Job_InvId] [int] NOT NULL,
	[Job_InvDetId] [int] IDENTITY(1,1) NOT NULL,
	[ItemId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
	[SizeId] [int] NOT NULL,
	[Quantity] [numeric](14, 3) NOT NULL,
	[Rate] [numeric](8, 5) NOT NULL,
	[Amount] [numeric](14, 5) NOT NULL,
	[JobRecptId] [int] NOT NULL, 
    [RejRate] NUMERIC(18, 3) NULL, 
    [RejQty] NUMERIC(18, 3) NULL, 
    CONSTRAINT [PK_Job_Inv_Det] PRIMARY KEY ([Job_InvDetId]), 
    CONSTRAINT [FK_Job_Inv_Det_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
	 CONSTRAINT [FK_Job_Inv_Det_Color] FOREIGN KEY ([ColorId]) REFERENCES [Color]([ColorId]),
	  CONSTRAINT [FK_Job_Inv_Det_Size] FOREIGN KEY ([SizeId]) REFERENCES [Size]([SizeId]),
	   CONSTRAINT [FK_Job_Inv_Det_Job_recpt_det] FOREIGN KEY ([JobRecptId]) REFERENCES [Job_recpt_mas]([JobRecptId]),
	    CONSTRAINT [FK_Job_Inv_Det_Job_Inv_Mas] FOREIGN KEY ([Job_InvId]) REFERENCES [Job_Inv_Mas]([Job_InvId])
)
