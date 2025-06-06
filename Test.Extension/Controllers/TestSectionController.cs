using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Web.Common.Authorization;

namespace Test.Extension.Controllers;

/// <summary>
/// Controller for managing test section items.
/// </summary>
[ApiVersion("1.0")]
public class TestSectionController : TestApiControllerBase
{
    private readonly ILogger<TestSectionController> _logger;
    private static readonly List<TestItem> _items = new();
    private static int _nextId = 1;

    public TestSectionController(ILogger<TestSectionController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Get all test items.
    /// </summary>
    /// <returns>List of test items</returns>
    [HttpGet("items")]
    [ProducesResponseType(typeof(IEnumerable<TestItem>), StatusCodes.Status200OK)]
    public IActionResult GetItems()
    {
        _logger.LogInformation("Getting all test items. Count: {Count}", _items.Count);
        return Ok(_items);
    }

    /// <summary>
    /// Get a specific test item by ID.
    /// </summary>
    /// <param name="id">The item ID</param>
    /// <returns>The test item</returns>
    [HttpGet("items/{id:int}")]
    [ProducesResponseType(typeof(TestItem), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetItem(int id)
    {
        var item = _items.FirstOrDefault(x => x.Id == id);
        if (item == null)
        {
            _logger.LogWarning("Test item with ID {Id} not found", id);
            return NotFound();
        }

        _logger.LogInformation("Retrieved test item with ID {Id}", id);
        return Ok(item);
    }

    /// <summary>
    /// Create a new test item.
    /// </summary>
    /// <param name="request">The item data to create</param>
    /// <returns>The created item</returns>
    [HttpPost("items")]
    [ProducesResponseType(typeof(TestItem), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult CreateItem([FromBody] CreateTestItemRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest("Name is required");
        }

        var item = new TestItem
        {
            Id = _nextId++,
            Name = request.Name,
            Description = request.Description,
            CreatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
        };

        _items.Add(item);
        _logger.LogInformation("Created new test item with ID {Id}: {Name}", item.Id, item.Name);

        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
    }

    /// <summary>
    /// Update an existing test item.
    /// </summary>
    /// <param name="id">The item ID</param>
    /// <param name="request">The updated item data</param>
    /// <returns>The updated item</returns>
    [HttpPut("items/{id:int}")]
    [ProducesResponseType(typeof(TestItem), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult UpdateItem(int id, [FromBody] UpdateTestItemRequest request)
    {
        var item = _items.FirstOrDefault(x => x.Id == id);
        if (item == null)
        {
            _logger.LogWarning("Test item with ID {Id} not found for update", id);
            return NotFound();
        }

        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest("Name is required");
        }

        item.Name = request.Name;
        item.Description = request.Description;
        item.UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

        _logger.LogInformation("Updated test item with ID {Id}: {Name}", item.Id, item.Name);
        return Ok(item);
    }

    /// <summary>
    /// Delete a test item.
    /// </summary>
    /// <param name="id">The item ID</param>
    /// <returns>No content</returns>
    [HttpDelete("items/{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult DeleteItem(int id)
    {
        var item = _items.FirstOrDefault(x => x.Id == id);
        if (item == null)
        {
            _logger.LogWarning("Test item with ID {Id} not found for deletion", id);
            return NotFound();
        }

        _items.Remove(item);
        _logger.LogInformation("Deleted test item with ID {Id}: {Name}", item.Id, item.Name);
        return NoContent();
    }
}

/// <summary>
/// Represents a test item.
/// </summary>
public class TestItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string CreatedAt { get; set; } = string.Empty;
    public string? UpdatedAt { get; set; }
}

/// <summary>
/// Request model for creating a test item.
/// </summary>
public class CreateTestItemRequest
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

/// <summary>
/// Request model for updating a test item.
/// </summary>
public class UpdateTestItemRequest
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
} 