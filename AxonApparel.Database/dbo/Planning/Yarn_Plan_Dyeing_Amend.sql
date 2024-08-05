CREATE TABLE [dbo].[Yarn_Plan_Dyeing_Amend]
(
	[YPlanDyeAmndId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[YPlanDyeID] [int]   NULL, 
    [YPlanDetID] [int]  NULL,
	[SlNo] [int] NOT NULL,
	[Garment_ColorID] [int] NOT NULL,
	[GWeight] [decimal](10, 3) NOT NULL,
	[Yarn_DyeColorID] [int] NOT NULL,
	[Qty_Per] [decimal](5, 2) NOT NULL,
	[Weight] [decimal](9, 3) NOT NULL,
	[Purchase_Qty] [decimal](10, 3) NOT NULL,
	[Courses] [numeric](9, 3) NULL,
    [YSNo] [int] NULL,
	[CompSlNo][int]NULL,
    
	CONSTRAINT [FK_Yarn_Plan_Dyeing_am_Color] FOREIGN KEY ([Garment_ColorID]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_Yarn_Plan_Dyeing_am_ColorYarn] FOREIGN KEY ([Yarn_DyeColorID]) REFERENCES [Color]([Colorid])
)
