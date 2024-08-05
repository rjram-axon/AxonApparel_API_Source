CREATE TABLE [dbo].[Yarn_Plan_Mas_Amend]
(
	[YPlanmasAmndId] INT NOT NULL PRIMARY KEY IDENTITY(1,1) ,
	[YPlanmasID] [int]  NULL, 
    [PlanId] [int]  NULL,
	[FabricID] [int] NOT NULL,
	[Fabric_ColorId] [int] NOT NULL,
	[Fabric_Weight] [decimal](10, 3) NOT NULL,
	[Fabric_type] [char](1) NOT NULL,
	[EntryDate] [datetime] NOT NULL DEFAULT ('2005-01-01'), 
    [SlNo] [int]  NULL,
	[ComponentID] [int] NULL,
	[CompSlNo] [int] NULL,
  	
    CONSTRAINT [FK_Yarn_Plan_Mas_am_Item] FOREIGN KEY ([FabricID]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_Yarn_Plan_Mas_am_Color] FOREIGN KEY ([Fabric_ColorId]) REFERENCES [Color]([Colorid]),
	--CONSTRAINT [FK_Yarn_Plan_Mas_am_Planning_Mas] FOREIGN KEY ([PlanId]) REFERENCES [Planning_Mas]([PlanID]),
	CONSTRAINT [FK_Yarn_Plan_Mas_am_ItemComp] FOREIGN KEY ([ComponentID]) REFERENCES [Item]([ItemId])
)
