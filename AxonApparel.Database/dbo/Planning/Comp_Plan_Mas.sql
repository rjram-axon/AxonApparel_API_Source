CREATE TABLE [dbo].[Comp_Plan_Mas]
(
	[Comp_Plan_MasID] [int] IDENTITY(1,1) NOT NULL, 
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
	CONSTRAINT [PK_Comp_Plan_Mas] PRIMARY KEY ([Comp_Plan_MasID]),
	CONSTRAINT [FK_Comp_Plan_Mas_Planning_Mas] FOREIGN KEY ([FabricID]) REFERENCES [Item]([ItemId]), 
	CONSTRAINT [FK_Comp_Plan_Mas_Item] FOREIGN KEY ([PlanID]) REFERENCES [Planning_Mas]([PlanID]), 
	CONSTRAINT [FK_Comp_Plan_Mas_ItemComp] FOREIGN KEY ([ComponentID]) REFERENCES [Item]([ItemId])

)
