﻿CREATE TABLE [dbo].[Con_Plan]
(

    [Con_PlanID] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[CompSlNo] [int] NOT NULL,
	[CPlanSlNo] [int] NOT NULL,
	[PlanID] [int] NOT NULL,
	[ColorID] [int] NOT NULL,
	[SizeId] [int] NOT NULL,
	[Prdn_Qty] [int] NOT NULL,
	[Length] [decimal](9, 2) NOT NULL DEFAULT (0),
	[Width] [decimal](9, 2) NOT NULL DEFAULT (0),
	[GSM] [decimal](10, 3) NOT NULL DEFAULT (0),
	[Grammage] [decimal](10, 3) NULL,
	[Weight] [decimal](10, 3) NOT NULL,
	[Wmetres] [decimal](10, 2) NOT NULL DEFAULT (0),
	[ActualFabricWidth] [numeric](14, 3) NULL,
	[GreyWidthID] [int] NULL,
	[FinishWidthID] [int] NULL,
	[ComponentID] [int] NULL,
	LengthAllow [decimal](9, 2) NOT NULL DEFAULT (0),
	WidthAllow [decimal](9, 2) NOT NULL DEFAULT (0),
	Pattern [decimal](9, 2) NOT NULL DEFAULT (0),
	CONSTRAINT [fk_Con_Plan_ColorID] FOREIGN KEY([ColorID]) REFERENCES [dbo].[Color] ([Colorid]),
	CONSTRAINT [fk_Con_Plan_SizeId] FOREIGN KEY([SizeId]) REFERENCES [dbo].[Size] ([SizeId]),
	CONSTRAINT [fk_Con_Plan_GreyWidthID] FOREIGN KEY([GreyWidthID]) REFERENCES [dbo].[Size] ([SizeId]),
	CONSTRAINT [fk_Con_Plan_FinishWidthID] FOREIGN KEY([FinishWidthID]) REFERENCES [dbo].[Size] ([SizeId]),
	CONSTRAINT [fk_Con_Plan_PlanID] FOREIGN KEY([PlanID]) REFERENCES [dbo].[Planning_Mas] ([PlanID]),
	CONSTRAINT [FK_Con_Plan_ItemComp] FOREIGN KEY ([ComponentID]) REFERENCES [Item]([ItemId])
)
