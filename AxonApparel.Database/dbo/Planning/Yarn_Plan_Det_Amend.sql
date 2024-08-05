CREATE TABLE [dbo].[Yarn_Plan_Det_Amend]
(
	[YPlanDetAmndId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[YPlanDetID] [int]   NULL,
	[YPlanMasID] [int]  NULL,
	[Knit_In_ItemId] [int] NOT NULL,
	[Knit_In_SizeID] [int] NOT NULL,
	[Knit_in_ColorID] [int] NOT NULL,
	[Knit_In_Per] [decimal](5, 2) NOT NULL,
	[Knit_In_Qty] [decimal](10, 3) NULL,
	[Loss_per] [decimal](5, 2) NOT NULL DEFAULT ('0'),
	[Dyeing_Req] [bit] NOT NULL, 
    [SlNo] [int]  NULL,
	[YSNo] [int]  NULL,
	[FabricID][int] NOT NULL,
	[Fabric_ColorId] [int] NULL,
    
	CONSTRAINT [FK_Yarn_Plan_Det_am_Item] FOREIGN KEY ([Knit_In_ItemId]) REFERENCES [Item]([ItemId]),
	--CONSTRAINT [FK_Yarn_Plan_Det_Yarn_Plan_mas] FOREIGN KEY ([YPlanMasID]) REFERENCES [Yarn_Plan_Mas]([YPlanMasID]),
    CONSTRAINT [FK_Yarn_Plan_Det_Yarn_Plan_am_masFB] FOREIGN KEY ([FabricID]) REFERENCES [item]([itemID]),
    CONSTRAINT [FK_Yarn_Plan_Det_Yarn_Plan_am_masFC] FOREIGN KEY ([Fabric_ColorId]) REFERENCES [Color]([ColorId]),
	CONSTRAINT [FK_Yarn_Plan_Det_Yarn_Plan_am_Size] FOREIGN KEY ([Knit_In_SizeID]) REFERENCES [Size]([Sizeid]),
	CONSTRAINT [FK_Yarn_Plan_Det_Yarn_Plan_am_Color] FOREIGN KEY ([Knit_in_ColorID]) REFERENCES [Color]([ColorID])
)
