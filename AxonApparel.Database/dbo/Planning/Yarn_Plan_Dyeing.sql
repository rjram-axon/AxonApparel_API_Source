CREATE TABLE [dbo].[Yarn_Plan_Dyeing]
(
	[YPlanDyeID] [int] IDENTITY(1,1) NOT NULL, 
    [YPlanDetID] [int] NOT NULL,
	[SlNo] [int] NOT NULL,
	[Garment_ColorID] [int] NOT NULL,
	[GWeight] [decimal](10, 3) NOT NULL,
	[Yarn_DyeColorID] [int] NOT NULL,
	[Qty_Per] [decimal](5, 2) NOT NULL,
	[Weight] [decimal](9, 3) NOT NULL,
	[Purchase_Qty] [decimal](10, 3) NOT NULL,
	[Courses] [numeric](9, 3) NULL,
    [YSNo] [int] NOT NULL,
	[CompSlNo][int]NULL,
    CONSTRAINT [PK_Yarn_Plan_Dyeing] PRIMARY KEY ([YPlanDyeID]),    
	CONSTRAINT [FK_Yarn_Plan_Dyeing_Color] FOREIGN KEY ([Garment_ColorID]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_Yarn_Plan_Dyeing_ColorYarn] FOREIGN KEY ([Yarn_DyeColorID]) REFERENCES [Color]([Colorid])
)
