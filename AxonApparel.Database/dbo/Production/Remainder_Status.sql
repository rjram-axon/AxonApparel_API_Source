CREATE TABLE [dbo].[Remainder_Status]
(
	[statusid] INT IDENTITY(1,1) NOT NULL,
	[status] [varchar](20) NOT NULL,
	[status_type] [varchar](1) NOT NULL Default('Y'),
	CONSTRAINT [PK_RemainderStatusid] PRIMARY KEY ([statusid]),
	CONSTRAINT [Ck_RemainderStatustype] CHECK  ([status_type] = 'Y' or [status_type]='N' or [status_type]='X')
)
