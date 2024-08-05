CREATE TABLE [dbo].[AccFormula]
(
	[Formulaid] INT IDENTITY(1,1) NOT NULL, 
	[FormulaName] [varchar](50) NULL,
	[Formula] [varchar](200) NULL,
	[FormulaSetupid] [varchar](200) NULL,
	[addlessid] [int] NULL, 
    CONSTRAINT [PK_AccFormula] PRIMARY KEY ([Formulaid]), 
    CONSTRAINT [FK_AccFormula_AccFormula] FOREIGN KEY ([addlessid]) REFERENCES [addless]([addlessid])	
)
