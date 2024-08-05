CREATE TABLE [dbo].[Unit_Conversion]
(
	[UConvID] [int] IDENTITY(1,1) NOT NULL primary key,
	[FromUomID] [int] NOT NULL,
	[ToUomID] [int] NOT NULL,
	Conversion varchar(30),
	[ConvMode] varchar(30),
	[IsActive] [bit] NOT NULL DEFAULT (1), 
   CONSTRAINT [FK_FromUnitConversion] FOREIGN KEY ([FromUomID]) REFERENCES [Unit_of_measurement]([UomId]),
	CONSTRAINT [FK_ToUnitConversion] FOREIGN KEY ([ToUomID]) REFERENCES [Unit_of_measurement]([UomId]),

)
