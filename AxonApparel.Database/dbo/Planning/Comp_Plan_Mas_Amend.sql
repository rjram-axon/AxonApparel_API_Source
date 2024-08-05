CREATE TABLE [dbo].[Comp_Plan_Mas_Amend]
(
	[Comp_Plan_MasAmndId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Comp_Plan_MasID] [int]  NULL, 
	[Entry_Date] [datetime] NOT NULL,
	[CompSlNo] [int] NOT NULL,
	[PlanID] [int] NOT NULL,
	[ComponentID] [int] NOT NULL,
	[No_Of_Parts] [int] NOT NULL DEFAULT (1),
	[Fabric_Type] [char](1) NOT NULL,
	[Grouping] [char](2) NOT NULL,
	[Unit] [char](2) NOT NULL DEFAULT ('NA'),
	[Description] [varchar](120) NULL,
	[FabricID] [int] NULL,
	[GSM] [decimal](10, 3) NULL DEFAULT (0),
	
	CONSTRAINT [FK_Comp_Plan_Mas_am_Planning_Mas] FOREIGN KEY ([FabricID]) REFERENCES [Item]([ItemId]), 
	--CONSTRAINT [FK_Comp_Plan_Mas_am_Item] FOREIGN KEY ([PlanID]) REFERENCES [Planning_Mas]([PlanID]), 
	CONSTRAINT [FK_Comp_Plan_Mas_am_ItemComp] FOREIGN KEY ([ComponentID]) REFERENCES [Item]([ItemId])
)
