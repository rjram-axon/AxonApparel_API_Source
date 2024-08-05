CREATE TABLE [dbo].[Reason]
(
	[ReasonId] [int] IDENTITY(1,1) NOT NULL,
	[Reason] [varchar](100) NULL,
	[IsActive] [bit] default (1) NOT NULL, 
    CONSTRAINT [PK_Reason] PRIMARY KEY ([ReasonId])
)
