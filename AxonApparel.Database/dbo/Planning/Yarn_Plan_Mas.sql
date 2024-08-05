CREATE TABLE [dbo].[Yarn_Plan_Mas]
(
	[YPlanmasID] [int] IDENTITY(1,1) NOT NULL, 
    [PlanId] [int] NOT NULL,
	[FabricID] [int] NOT NULL,
	[Fabric_ColorId] [int] NOT NULL,
	[Fabric_Weight] [decimal](10, 3) NOT NULL,
	[Fabric_type] [char](1) NOT NULL,
	[EntryDate] [datetime] NOT NULL DEFAULT ('2005-01-01'), 
    [SlNo] [int] NOT NULL,
	[ComponentID] [int] NULL,
	[CompSlNo] [int] NULL,
    CONSTRAINT [PK_Yarn_Plan_Mas] PRIMARY KEY ([YPlanmasID]),		
    CONSTRAINT [FK_Yarn_Plan_Mas_Item] FOREIGN KEY ([FabricID]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_Yarn_Plan_Mas_Color] FOREIGN KEY ([Fabric_ColorId]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_Yarn_Plan_Mas_Planning_Mas] FOREIGN KEY ([PlanId]) REFERENCES [Planning_Mas]([PlanID]),
	CONSTRAINT [FK_Yarn_Plan_Mas_ItemComp] FOREIGN KEY ([ComponentID]) REFERENCES [Item]([ItemId])
)
