CREATE TABLE [dbo].[Sample_FabricPlan]
(
	[SamFabPlanID] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [SampleJobNo] [varchar](20) NOT NULL,
	[ItemID] [int] NULL,
	[BColorID] [int] NULL,
	[FColorID] [int] NULL,
	[SizeID] [int] NULL,
	[ProgramQty] [numeric](14, 3) NULL,
	[PrintColorId] [int] NULL,
	[BPurQty] [numeric](14, 3) NULL,
	[FPurQty] [numeric](14, 3) NULL, 
	[FSNo][int] NULL,
	[YSNo][int] NULL,
	[FabricID][int] NULL,
    [Per] [decimal](5, 2) NULL,
    CONSTRAINT [FK_Sample_FabricPlan_Item] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemID]),
	CONSTRAINT [FK_Sample_FabricPlan_Color] FOREIGN KEY ([BColorID]) REFERENCES [Color]([ColorID]),
	CONSTRAINT [FK_Sample_FabricPlan_FColor] FOREIGN KEY ([FColorID]) REFERENCES [Color]([ColorID]),
	CONSTRAINT [FK_Sample_FabricPlan_PColor] FOREIGN KEY ([PrintColorId]) REFERENCES [Color]([ColorID]),
	CONSTRAINT [FK_Sample_FabricPlan_Size] FOREIGN KEY ([SizeID]) REFERENCES [Size]([SizeID]),
	  CONSTRAINT [FK_Sample_FabricPlan_FabItem] FOREIGN KEY ([FabricID]) REFERENCES [Item]([ItemID])
)
