CREATE TABLE [dbo].[Approval]
(
	[ApprovalId] INT IDENTITY(1,1) NOT NULL,
	[ApprovalTitle] [varchar](50) NOT NULL,
	[ApprovalDays] [smallint] DEFAULT (0) NOT NULL,
	[Description] [varchar](1500) NULL,
	[IsActive] [bit]  DEFAULT (1) NOT NULL,
	[ColorNo] [varchar](50)  DEFAULT ('16777215') NULL, 
    CONSTRAINT [PK_Approval] PRIMARY KEY ([ApprovalId])
)
